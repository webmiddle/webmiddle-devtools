import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactInspector, {
  chromeLight,
  ObjectName,
  ObjectValue as OriginalObjectValue
} from "react-inspector";
import OriginalObjectPreview from "react-inspector/lib/object-inspector/ObjectPreview";
import { withRouter } from "react-router-dom";

import { actionCreators as serverActions } from "../actions/server";
import { actionCreators as resourcesActions } from "../actions/resources";
import { store } from "../store/store";

// HACK: connect doesn't work, neither we can
// pass actions down to ObjectValue, thus
// we just use dispatch directly
const { dispatch } = store;

class _ResourceObjectValue extends Component {
  static propTypes = {
    object: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  handleResourceClick = event => {
    event.stopPropagation(); // pevent expand

    const { object } = this.props;
    dispatch(resourcesActions.openResource(object.id));
    this.props.history.push("/resources");
  };

  render() {
    const { object } = this.props;
    return (
      <a
        href="javascript:void(0);"
        title="Open in resources tab"
        onClick={this.handleResourceClick}
      >
        {object.constructor.name}
        &nbsp;
        {object.name}
      </a>
    );
  }
}
const ResourceObjectValue = withRouter(_ResourceObjectValue);

// A short description of the object values.
// Can be used to render tree node in ObjectInspector
// or render objects in TableInspector.
class ObjectValue extends Component {
  componentWillMount() {
    this.loadMoreIfNeeded(this.props.object);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.object !== this.props.object) {
      this.loadMoreIfNeeded(nextProps.object);
    }
  }

  loadMoreIfNeeded = object => {
    if (
      typeof object === "object" &&
      object !== null &&
      object.constructor &&
      object.constructor.name === "More"
    ) {
      dispatch(serverActions.loadMore(object));
    }
  };

  render() {
    const { object } = this.props;

    if (
      typeof object === "object" &&
      object !== null &&
      (object.constructor &&
        (object.constructor.name === "Resource" ||
          object.constructor.name === "Virtual" ||
          object.constructor.name === "More"))
    ) {
      if (object.constructor.name === "Resource") {
        return <ResourceObjectValue object={object} />;
      }

      if (object.constructor.name === "Virtual") {
        return (
          <span>
            {"<"}
            {object.type}
            {" />"}
          </span>
        );
      }

      if (object.constructor.name === "More") {
        return <span>Loading....</span>;
      }
    }

    return <OriginalObjectValue {...this.props} />;
  }
}

const ObjectPreview = props => {
  const { data } = props;
  const object = data;

  if (
    typeof object === "object" &&
    object !== null &&
    (object.constructor &&
      (object.constructor.name === "Resource" ||
        object.constructor.name === "Virtual" ||
        object.constructor.name === "More"))
  ) {
    return <ObjectValue object={object} />;
  }

  return <OriginalObjectPreview {...props} />;
};

const ObjectLabel = ({ name, data, isNonenumerable }) => {
  const object = data;

  return (
    <span>
      <ObjectName name={name} dimmed={isNonenumerable} />
      <span>: </span>
      <ObjectValue object={object} />
    </span>
  );
};

const ObjectRootLabel = ({ name, data }) => {
  if (typeof name === "string") {
    return (
      <span>
        <ObjectName name={name} />
        <span>: </span>
        <ObjectPreview data={data} />
      </span>
    );
  }
  return <ObjectPreview data={data} />;
};

const nodeRenderer = ({ depth, name, data, isNonenumerable, expanded }) => {
  return depth === 0 ? (
    !expanded ? (
      <ObjectRootLabel name={name} data={data} />
    ) : (
      <ObjectValue object={data} />
    )
  ) : (
    <ObjectLabel name={name} data={data} isNonenumerable={isNonenumerable} />
  );
};

const Inspector = props => (
  <ReactInspector
    theme={{
      ...chromeLight,
      ...{ BASE_FONT_SIZE: "20px" }
    }}
    nodeRenderer={nodeRenderer}
    {...props}
  />
);

export default Inspector;
