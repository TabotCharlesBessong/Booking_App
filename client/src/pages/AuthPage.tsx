import React, { useState } from 'react';
import { TextInput } from '../components';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true); // State variable for form mode

  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <div className="w-1/2 p-8 rounded-lg shadow-md bg-sky-100">
        <h2 className="mb-4 text-2xl font-bold text-sky-700">
          {isSignup ? 'Sign Up' : 'Login'}
        </h2>
        <form onSubmit={(event) => { event.preventDefault(); }}>
          {/* Add logic for email and password inputs here */}
          <TextInput name='person' type='text' placeholder='enter your name' label='Username' />
          <TextInput name='email'  type='email'  placeholder='enter your email' label='Email' />
          <TextInput name='password'  type='password'  placeholder='enter your password' label='Password' />
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white rounded bg-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
            {isSignup && (
              <p className="text-sm text-gray-700">
                Already have an account? &nbsp;
                <a
                  href="#" // Replace with appropriate link or handle transition in JS
                  className="text-sky-500 hover:underline"
                  onClick={() => setIsSignup(!isSignup)}
                >
                  Login
                </a>
              </p>
            )}
            {!isSignup && (
              <p className="text-sm text-gray-700">
                Don't have an account? &nbsp;
                <a
                  href="#" // Replace with appropriate link or handle transition in JS
                  className="text-sky-500 hover:underline"
                  onClick={() => setIsSignup(!isSignup)}
                >
                  Sign Up
                </a>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;

