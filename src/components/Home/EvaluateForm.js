import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
import { reduxForm, Field, propTypes as reduxFormPropTypes } from "redux-form";
import RaisedButton from "material-ui/RaisedButton";
import { TextField } from "redux-form-material-ui";
import CodeEditor from "../CodeEditor";
import styles from "./Home.module.scss";

function parseJson(value) {
  let parsedValue;
  try {
    parsedValue = JSON.parse(value);
  } catch (err) {
    parsedValue = null;
  }
  return parsedValue;
}

class EditorField extends Component {
  render() {
    const { input: { name, value, onChange } } = this.props;
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
    server: PropTypes.object.isRequired
  };

  onSubmit = fields => {
    this.props.onSubmit({
      ...fields,
      bodyProps: parseJson(fields.bodyProps),
      bodyOptions: parseJson(fields.bodyOptions),
    });
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div className={styles.row}>
          <label htmlFor="servicePath">Service</label>
          <Field
            name="servicePath"
            component={TextField}
            hintText="multiply"
            className={styles.value}
            id="servicePath"
          />

          <RaisedButton
            type="submit"
            label="Evaluate"
            secondary
            disabled={!this.props.server.connected}
          />
        </div>

        <div className={classNames(styles.row, styles.body)}>
          <div className={classNames(styles.col, styles.props)}>
            <span>Props: </span>
            <Field name="bodyProps" component={EditorField} />
          </div>

          <div className={classNames(styles.col, styles.options)}>
            <span>Options: </span>
            <Field name="bodyOptions" component={EditorField} />
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "evaluate",
  initialValues: {
    servicePath: "multiply",
    bodyProps: JSON.stringify(
      {
        a: 10,
        b: 20
      },
      null,
      2
    ),
    bodyOptions: JSON.stringify({
      networkRetries: 2,
    }, null, 2),
  }
})(EvaluateForm);
