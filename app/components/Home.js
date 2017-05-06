// @flow
import React, { Component } from "react";
import { reduxForm, propTypes as reduxFormPropTypes } from "redux-form";
import TextField from "material-ui/TextField";
import RaisedButton from 'material-ui/RaisedButton';
import styles from "./Home.scss";

class Home extends Component {
  static propTypes = {
    ...reduxFormPropTypes
  };

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.connection}>
          <TextField
            className={styles.hostname}
            name="hostname"
            hintText="localhost"
            {...this.props.fields.hostname}
          />

          <TextField name="port" hintText="3000" {...this.props.fields.port} />

          <RaisedButton label="Connect" primary />
        </div>

        <div className={styles.logs}>
          Waiting for connection...
        </div>

        <div className={styles.command}>
          <label htmlFor="servicePath">Service</label>
          <TextField className={styles.value} hintText="math.sum" {...this.props.fields.servicePath} id="servicePath" />
          <RaisedButton label="Evaluate" secondary />
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "evaluate",
  fields: ["hostname", "port", "servicePath"]
})(Home);
