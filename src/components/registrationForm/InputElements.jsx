import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';

const InputElements = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { id, name } = props;
  return (
    <React.Fragment>
      <label htmlFor={id || name}>{label}</label>
      <input className="form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error" style={{ color: 'red' }}>{meta.error}</div>
      ) : null}
    </React.Fragment>
  );
};

InputElements.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
};
export default InputElements;
