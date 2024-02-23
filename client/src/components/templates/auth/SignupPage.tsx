import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Input from './Input';


const SignupPage = () => {
  // ... no changes in state variable and initial rendering

  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <div className="w-1/2 p-8 rounded-lg shadow-md bg-sky-100">
        <h2 className="mb-4 text-2xl font-bold text-sky-700">Sign Up</h2>
        <form onSubmit={(event) => { event.preventDefault(); }}>
          {/* Add logic for email and password inputs here */}
          <div className="mb-4">
          <Input label="Username" type="text" placeholder="Enter your username" />
          <Input label="Password" type="password" placeholder="Enter your password" />
          <Input label="Confirm Password" type="password" placeholder="Confirm your password" />
          </div>
          <div className="flex items-center justify-between">
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white rounded bg-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Sign Up
            </button>
            <p className="text-sm text-gray-700">
              Already have an account? &nbsp;
              <Link to="/login" className="text-sky-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
