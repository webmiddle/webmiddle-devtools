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
import * as noty from "../../utils/noty";
import Loading from "../Loading/Loading";

class Auth extends Component {
  static propTypes = {
    ...reduxFormPropTypes,
    server: PropTypes.object.isRequired,
    hostname: PropTypes.string.isRequired,
    port: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,

    authActions: PropTypes.object.isRequired
  };

  handleSubmit = event => {
    event.preventDefault();

    const { hostname, port, apiKey } = this.props;
    this.props.authActions.login({ hostname, port, apiKey }).catch(err => {
      noty.showError(err);
    });
  };

  render() {
    // NOTE: apiKey can be empty
    const { hostname, port, server } = this.props;
    const disabled = !hostname.trim() || !port.trim() || server.connecting;
    return (
      <div className={styles.container} data-tid="container">
        {server.connecting && <Loading />}
        <form onSubmit={this.handleSubmit}>
          <Field
            name="hostname"
            component={TextField}
            hintText="hostname"
            className={styles.hostname}
          />
          <Field name="port" component={TextField} hintText="port" />
          <Field name="apiKey" component={TextField} hintText="apiKey" />
          <RaisedButton
            className={styles.submit}
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
const Form = reduxForm({
  form: formName
})(Auth);

const formSelector = formValueSelector(formName);
const mapStateToProps = state => {
  const storedData = getStoredData() || {};
  return {
    initialValues: {
      hostname: storedData.hostname || "localhost",
      port: storedData.port || "3000",
      apiKey: storedData.apiKey || ""
    },
    hostname: formSelector(state, "hostname") || "",
    port: formSelector(state, "port") || "",
    apiKey: formSelector(state, "apiKey") || ""
  };
};

export default connect(mapStateToProps)(Form);
