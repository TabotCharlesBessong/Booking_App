import React, { FormEvent, useState } from "react";
import TextInput from "../../components/auth/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { AuthFormData } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";

const Login = () => {
  const [formData, setFormData] = useState<AuthFormData>({});
  const navigate = useNavigate();
  const { loading, error, currentUser } = useSelector(
    (state: any) => state.user
  );
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.password || !formData.email)
      return dispatch(signInFailure("Please fill in all inputs fields"));
    try {
      dispatch(signInStart());
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(res);
      console.log(data);
      if (data.success === false) return dispatch(signInFailure(data.message));
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <div className="w-1/2 p-8 rounded-lg shadow-md bg-sky-100">
        <h2 className="mb-4 text-2xl font-bold text-sky-700">Login</h2>
        <form
          onSubmit={handleSubmit}
        >
          <TextInput
            name="email"
            type="email"
            placeholder="enter your email"
            label="Email"
            onChange={handleChange}
            id="email"
          />
          <TextInput
            name="password"
            type="password"
            placeholder="enter your password"
            label="Password"
            onChange={handleChange}
            id="password"
          />

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white rounded bg-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Login
            </button>

            <p className="text-sm text-gray-700">
              Don't have an account? &nbsp;
              <Link
                to="/signup" // Replace with appropriate link or handle transition in JS
                className="text-sky-500 hover:underline"
                onClick={() => {}}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
