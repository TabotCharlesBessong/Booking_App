import { Link } from 'react-router-dom';
import Input from './Input';
import React from 'react';

const LoginPage = () => {
  // Handle form submission and authentication logic here

  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <div className="w-1/2 p-8 rounded-lg shadow-md bg-sky-100">
        <h2 className="mb-4 text-2xl font-bold text-sky-700">Login</h2>
        <form onSubmit={(event) => { event.preventDefault(); }}>
       
          <Input label="Username" type="text" placeholder="Enter your username" />
          <Input label="Password" type="password" placeholder="Enter your password" />
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white rounded bg-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Log In
            </button>
            <p className="text-sm text-gray-700">
              Don't have an account? &nbsp;
              <Link to="/signup" className="text-sky-500 hover:underline">
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

