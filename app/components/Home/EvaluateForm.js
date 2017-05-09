import React, { Component } from 'react';
import { reduxForm, Field, propTypes as reduxFormPropTypes } from "redux-form";
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';
import styles from './Home.scss';

class EvaluateForm extends Component {
  static propTypes = {
    ...reduxFormPropTypes
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <label htmlFor="servicePath">Service</label>
        <Field name="servicePath" component={TextField} hintText="math.sum" className={styles.value} id="servicePath" />
        <RaisedButton type="submit" label="Evaluate" secondary />
      </form>
    );
  }
}

export default reduxForm({
  form: "evaluate",
  fields: ["servicePath"],
  initialValues: {
    servicePath: 'math.sum'
  },
})(EvaluateForm);
