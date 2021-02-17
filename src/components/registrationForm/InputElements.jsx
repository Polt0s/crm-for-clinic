import React from 'react';
import { useField } from 'formik';
import VisibilityIcon from '@material-ui/icons/Visibility';

export const InputElements = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <React.Fragment>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error" style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </React.Fragment>
  );
};

export const InputSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <React.Fragment>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select className="form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error" style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </React.Fragment>
  );
};

