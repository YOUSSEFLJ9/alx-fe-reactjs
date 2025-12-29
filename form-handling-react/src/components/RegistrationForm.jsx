import React from "react";
import { useState } from "react";

export default function RegistrationForm()
{
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
  {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword)
    {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }else if (formData.password.length < 6)
    {
      setErrors({ password: "Password must be at least 6 characters long" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email))
    {
      setErrors({ email: "Email address is invalid" });
      return;
    }
    if (formData.username.trim() === "" || formData.email.trim() === "" || formData.password.trim() === "" || formData.confirmPassword.trim() === "")
    {
      setErrors({ form: "All fields are required" });
      return;
    }
    setErrors({});
    console.log("Form Data Submitted:", formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Register</button>
      {errors.form && <p style={{ color: "red" }}>{errors.form}</p>}
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
      
    </form>
  );

}