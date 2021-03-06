import React from 'react';
import PropTypes from 'prop-types';
import './registration.css';

const UserAlreadyExists = (props) => {
  const { backToForm, text } = props;
  return (
    <div id="userAlreadyExists" className="form-group">
      <div id="textUserAlreadyExists">
        <p>{text}</p>
      </div>
      <button type="button" className="btn btn-primary" onClick={backToForm}>Back</button>
    </div>
  );
};

UserAlreadyExists.propTypes = {
  backToForm: PropTypes.func,
  text: PropTypes.string,
};

export default UserAlreadyExists;
