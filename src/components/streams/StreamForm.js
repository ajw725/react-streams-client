import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, label, inputId, meta }) => {
    return (
      <div className={`field${meta.touched && meta.error ? ' error' : ''}`}>
        <label htmlFor={inputId}>{label}</label>
        <input type="text" id={inputId} {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  // redux-form will call preventDefault
  onSubmit = (formData) => {
    this.props.onSubmit(formData);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Enter Title"
          inputId="stream-title"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
          inputId="stream-desc"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formData) => {
  const errors = {};
  if (!formData.title) {
    errors.title = 'Please enter a valid title.';
  }
  if (!formData.description) {
    errors.description = 'Please enter a valid description.';
  }

  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate,
})(StreamForm);
