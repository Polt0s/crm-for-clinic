import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../actions/index.js';

const Test = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={(() => dispatch(logOut()))}>Выйти</button>
    </div>
  );
};

export default Test;
