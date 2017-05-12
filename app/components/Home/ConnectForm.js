import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm, Field, propTypes as reduxFormPropTypes } from "redux-form";
import RaisedButton from "material-ui/RaisedButton";
import { TextField } from "redux-form-material-ui";
import styles from "./Home.scss";

class ConnectForm extends Component {
  static propTypes = {
    ...reduxFormPropTypes,
    server: PropTypes.object.isRequired
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name="hostname"
          component={TextField}
          hintText="localhost"
          className={styles.hostname}
        />
        <Field name="port" component={TextField} hintText="3000" />
        <RaisedButton
          type="submit"
          label={!this.props.server.connected ? "Connect" : "Disconnect"}
          primary
          disabled={this.props.server.connecting}
        />
      </form>
    );
  }
}

export default reduxForm({
  form: "home.connect",
  initialValues: {
    hostname: "localhost",
    port: 3000
  }
})(ConnectForm);
