import React, { FormEvent, useState } from "react";
import TextInput from "../../components/auth/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { AuthFormData, User } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { signInSuccess, signUpFailure, signUpStart } from "../../redux/user/userSlice";

const Signup = () => {
  const [formData, setFormData] = useState<AuthFormData>({})
  const navigate = useNavigate()
  const {loading,error,currentUser} = useSelector((state:any) => state.user)
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Hello")
    if(!formData.password || !formData.email || !formData.name) return dispatch(signUpFailure("Please fill all input fields"))
    console.log(formData)
    try {
      dispatch(signUpStart())
      const res = await fetch("/api/users/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      });
      const data = await res.json()
      console.log(res)
      console.log(data)
      if(data.success === false) return dispatch(signUpFailure(data.message))
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
      dispatch(signUpFailure(error.message))
    }
  }
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <div className="w-1/2 p-8 rounded-lg shadow-md bg-sky-100">
        <h2 className="mb-4 text-2xl font-bold text-sky-700">Signup</h2>
        <form
          onSubmit={handleSubmit}
        >
          {/* Add logic for email and password inputs here */}
          <TextInput
            name="person"
            type="text"
            placeholder="enter your name"
            label="Username"
            onChange={handleChange}
            id="name"
          />
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
              Signup
            </button>

            <p className="text-sm text-gray-700">
              Already have an account? &nbsp;
              <Link
                to="/login" // Replace with appropriate link or handle transition in JS
                className="text-sky-500 hover:underline"
                onClick={() => {}}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
