import React, { useState } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { serverEndpoint } from './config';
import { useDispatch } from 'react-redux';
import SET_USER from './redux/actionTypes';

function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (validateForm()) {
      const body = {
        email: formData.email,
        password: formData.password,
      };
      const configuration = {
        withCredentials: true
      };
      try{
        const response = await axios.post(`${serverEndpoint}/auth/login`, body,configuration );
        // updateUserDetails(response.data.userDetails);
        dispatch({
        type: SET_USER,
        payload: response.data.userDetails
      });
        console.log(response);
      }catch(error){
        if (error?.response?.status === 400) {
          setError({message: 'Invalid email or password' });
        } else {
          setError({message:'Something went wrong!'});
        }
      }

    }
  }
    const handleGoogleSignin = async (authResponse) => {
      try{
        const response = await axios.post(`${serverEndpoint}/auth/google-auth`, { idToken: authResponse.credential },{withCredentials: true});
        // updateUserDetails(response.data.userDetails);
        dispatch({
        type: SET_USER,
        payload: response.data.userDetails
      });
      }catch(error){
        console.error('Google login error:', error);
      }
  };
  const handleGoogleSigninFailure = async (error) => {
    console.log(error);
    setError({message: 'Google login failed. Please try again.'});
  }

  return (
    <div className="container text-center mt-5">
      <h4>Login</h4>
      {error.message && <div className="text-danger">{error.message}</div>}
      <form className="mx-auto w-50 mt-4" onSubmit={handleSubmit}>
        <div className="mb-3 text-start">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control text-center"
            id="email"
            name="email"
            placeholder="xyz@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          {error.email && <div className="text-danger">{error.email}</div>}
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className="form-control text-center"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          {error.password && <div className="text-danger">{error.password}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-4">Login</button>

        {message && <div className="text-success mt-3">{message}</div>}
      </form>
      <h4>OR</h4>
      <GoogleOAuthProvider clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID}><GoogleLogin onSuccess={handleGoogleSignin} onError={handleGoogleSigninFailure}></GoogleLogin></GoogleOAuthProvider>
    </div>
  );
}

export default Login;
