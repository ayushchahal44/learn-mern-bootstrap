import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

function Login({updateUserDetails}) {
  // const navigate = useNavigate();
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if(formData.email === "admin@gmail.com" && formData.password === "admin") {
      updateUserDetails({
        email: 'admin@gmail.com',
        name: 'Admin',
      });
      // navigate("/dashboard");
    } else{
      setMessage("Invalid email or password");
    }

    if (validateForm()) {
      setMessage("Login successful!");
      setError({});
      console.log("Form Data Submitted:", formData);
    } else {
      setMessage("");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h4>Login</h4>
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
