import React from 'react';
import PropTypes from 'prop-types';
import './registration.css';

const UserAlreadyExists = (props) => {
  const { backToForm } = props;
  return (
    <div id="userAlreadyExists" className="form-group">
      <div id="textUserAlreadyExists">
        <p>User with this email already exists</p>
      </div>
      <button type="button" className="btn btn-primary" onClick={backToForm}>Back</button>
    </div>
  );
};

UserAlreadyExists.propTypes = {
  backToForm: PropTypes.func,
};

export default UserAlreadyExists;
