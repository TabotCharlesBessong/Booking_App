import React from 'react';

const SignupPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen text-w">
      <div className="w-1/2 p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold">  Sign-Up</h2>
        <br />
        <form>
        <div className="flex items-center gap-2">
        <span className="text-gray-500"></span>
        <input
          type="text"
          placeholder="Name"
          className="px-4 py-2 text-black bg-gray-100 rounded focus:outline-none focus:ring-blue-500"
        />
      </div><br />
      <div className="flex items-center gap-2">
        <span className="text-gray-500"></span>
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 text-black bg-gray-100 rounded focus:outline-none focus:ring-blue-500"
        />
      </div><br />
      <div className="flex items-center gap-2">
        <span className="text-gray-500"></span>
        <input
          type="password"
          placeholder="Password"
          className="px-8 py-2 text-black bg-gray-100 rounded focus:outline-none focus:ring-blue-500 w-500"
        />
      </div>
    
      {/* <button
        type="submit"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Submit
      </button> */}
      <br />
          <button className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded">Sign-Up</button>
        </form>
        <p className="mt-4 text-center">Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
      </div>
    </div>
  );
};

export default SignupPage;
