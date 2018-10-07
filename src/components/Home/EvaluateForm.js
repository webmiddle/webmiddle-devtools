import React, { Component } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import {
  reduxForm,
  Field,
  propTypes as reduxFormPropTypes,
  formValueSelector
} from "redux-form";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { AutoComplete, TextField } from "redux-form-material-ui";
import CodeEditor from "../CodeEditor";
import styles from "./Home.module.scss";

import values from "lodash/values";

function parseJson(value) {
  let parsedValue;
  try {
    parsedValue = JSON.parse(value);
  } catch (err) {
    parsedValue = null;
  }
  return parsedValue;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function getStoredData(servicePath) {
  return JSON.parse(localStorage.getItem(`service:${servicePath}`) || "{}");
}

function setStoredData(servicePath, fn) {
  const storedData = getStoredData(servicePath);
  localStorage.setItem(
    `service:${servicePath}`,
    JSON.stringify(fn(storedData))
  );
}

class EditorField extends Component {
  render() {
    const {
      input: { name, value, onChange }
    } = this.props;
    return (
      <CodeEditor
        className={styles.editor}
        id={`home.evaluate.${name}`}
        mode="json"
        value={value}
        onChange={onChange}
      />
    );
  }
}

class EvaluateForm extends Component {
  static propTypes = {
    ...reduxFormPropTypes,
    server: PropTypes.object.isRequired,
    servicePath: PropTypes.string.isRequired,
    bodyProps: PropTypes.string.isRequired,
    bodyOptions: PropTypes.string.isRequired
  };

  onSubmit = fields => {
    this.props.onSubmit({
      ...fields,
      bodyProps: parseJson(fields.bodyProps),
      bodyOptions: parseJson(fields.bodyOptions)
    });

    // store in cache
    setStoredData(fields.servicePath, storedData => ({
      ...storedData,
      bodyProps: fields.bodyProps,
      bodyOptions: fields.bodyOptions
    }));
  };

  filterAutoComplete = (searchText, path) => {
    const serviceData = this.props.server.servicePaths[path];
    const keys = [...values(serviceData), path].filter(k => k);
    return (
      searchText === "" ||
      !!keys.find(
        key => key.match(new RegExp(escapeRegExp(searchText), "i")) !== null
      )
    );
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.servicePath !== this.props.servicePath) {
      // load cached if any
      const storedData = getStoredData(nextProps.servicePath);
      if (storedData.bodyProps) {
        this.props.change("bodyProps", storedData.bodyProps);
      }
      if (storedData.bodyOptions) {
        this.props.change("bodyOptions", storedData.bodyOptions);
      }
    }
  }

  render() {
    const { server } = this.props;
    const disabled = !server.connected;

    return (
      <form
        className={cn({ [styles.disabled]: disabled })}
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className={styles.row}>
          <Field
            className={styles.value}
            id="servicePath"
            name="servicePath"
            floatingLabelText="Service path"
            component={AutoComplete}
            dataSource={Object.keys(server.servicePaths)}
            filter={this.filterAutoComplete}
            fullWidth
            openOnFocus
          />

          <RaisedButton
            type="submit"
            label="Evaluate"
            secondary
            disabled={disabled}
          />
        </div>

        <div className={cn(styles.row, styles.body)}>
          <div className={cn(styles.col, styles.props)}>
            <span>Props: </span>
            <Field name="bodyProps" component={EditorField} />
          </div>

          <div className={cn(styles.col, styles.options)}>
            <span>Options: </span>
            <Field name="bodyOptions" component={EditorField} />
          </div>
        </div>
      </form>
    );
  }
}

const formName = "evaluate";
const Form = reduxForm({
  form: formName,
  initialValues: {
    servicePath: "",
    bodyProps: JSON.stringify(
      {
        // url: "https://news.ycombinator.com/",
        // query: "show hn"
      },
      null,
      2
    ),
    bodyOptions: JSON.stringify(
      {
        networkRetries: 2
      },
      null,
      2
    )
  }
})(EvaluateForm);

const formSelector = formValueSelector(formName);
const mapStateToProps = state => ({
  servicePath: formSelector(state, "servicePath"),
  bodyProps: formSelector(state, "bodyProps"),
  bodyOptions: formSelector(state, "bodyOptions")
});

export default connect(mapStateToProps)(Form);
