import React, { useState } from 'react';
import axios from 'axios';

function Login({updateUserDetails}) {
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
        const response = await axios.post('http://localhost:5000/auth/login', body,configuration );
        updateUserDetails(response.data.userDetails);
        console.log(response);
      }catch(error){
        if (error.response && error.response.data && error.response.data.message) {
          setError({message: error.response.data.message});
        } else {
          setError({message:'Something went wrong!'});
        }
      }

    }
  };

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
    </div>
  );
}

export default Login;
