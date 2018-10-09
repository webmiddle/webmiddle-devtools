// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  reduxForm,
  Field,
  propTypes as reduxFormPropTypes,
  formValueSelector
} from "redux-form";
import { TextField } from "redux-form-material-ui";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";

import styles from "./Auth.module.scss";
import { getStoredData } from "../../actions/auth";

class Auth extends Component {
  static propTypes = {
    ...reduxFormPropTypes,
    server: PropTypes.object.isRequired,
    hostname: PropTypes.string.isRequired,
    port: PropTypes.string.isRequired,

    authActions: PropTypes.object.isRequired
  };

  handleSubmit = event => {
    event.preventDefault();

    const { hostname, port } = this.props;
    this.props.authActions.login({ hostname, port });
  };

  render() {
    const { hostname, port, server } = this.props;
    const disabled = !hostname.trim() || !port.trim() || server.connecting;
    return (
      <div className={styles.container} data-tid="container">
        <form onSubmit={this.handleSubmit}>
          <Field
            name="hostname"
            component={TextField}
            hintText="hostname"
            className={styles.hostname}
          />
          <Field name="port" component={TextField} hintText="port" />
          <RaisedButton
            type="submit"
            label="Login"
            primary
            disabled={disabled}
          />
        </form>
      </div>
    );
  }
}

const formName = "auth";
const initialStoredData = getStoredData() || {};
const Form = reduxForm({
  form: formName,
  initialValues: {
    hostname: initialStoredData.hostname || "localhost",
    port: initialStoredData.port || "3000"
  }
})(Auth);

const formSelector = formValueSelector(formName);
const mapStateToProps = state => ({
  hostname: formSelector(state, "hostname") || "",
  port: formSelector(state, "port") || ""
});

export default connect(mapStateToProps)(Form);
