// @flow
import React, { Component } from "react";
import { reduxForm, Field, propTypes as reduxFormPropTypes } from "redux-form";
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';
import ConnectForm from './ConnectForm';
import EvaluateForm from './EvaluateForm';
import styles from "./Home.scss";

class Home extends Component {
  static propTypes = {
    ...reduxFormPropTypes
  };

  handleConnect({ hostname, port }) {
    console.log(hostname + ' ' + port);
  }

  handleEvaluate({ servicePath }) {
    console.log(servicePath);
  }

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.connection}>
          <ConnectForm onSubmit={this.handleConnect.bind(this)} />
        </div>

        <div className={styles.logs}>
          Waiting for connection...
        </div>

        <div className={styles.command}>
          <EvaluateForm onSubmit={this.handleEvaluate.bind(this)} />
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "evaluate",
  fields: ["servicePath"],
  initialValues: {
    servicePath: 'math.sum'
  },
})(Home);
