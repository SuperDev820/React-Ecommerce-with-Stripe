/**
 *
 * SignupProvider
 *
 */

import React from 'react'

import GoogleIcon from './Icon'
import { BASE_SERVER_URL } from '../constants/key.js'

const SignupProvider = props => {
  return (
    <div className='signup-provider'>
      <a href={`${BASE_SERVER_URL}/api/users/google`} className='google-btn'>
        <GoogleIcon />
        <span className='btn-text'>Login with Google</span>
      </a>
    </div>
  );
};

export default SignupProvider;
