import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../actions/index.js';
// import AppRegistration from './registrationForm/AppRegistration.jsx'
const Test = () => {
  const dispatch = useDispatch();
  // (() => dispatch(logOut()))
  return (
    <div>
      <NavLink to="root" type="button" className="btn btn-primary" onClick={(() => dispatch(logOut()))}>Выйти</NavLink>
    </div>
  );
};

export default Test;
