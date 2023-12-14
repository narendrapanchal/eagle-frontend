import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../scss/Signup.module.scss";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "Customer",
  });
  const [isPending, setIsPending] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => value === "")) {
      console.log("Please fill in all fields.");
      alert("Please fill in all fields.");
      return;
    }
    setIsPending(true);
    try {
      const response = await fetch(
        "https://eagle-backend-ekxb.onrender.com/create/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status !== 200) {
        throw new Error("Registration failed.");
      }

      console.log("User registered successfully!");
      alert("User registered successfully!");
    } catch (err) {
      console.log("registration failed");
      alert("registration failed");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={styles.signup}>
      <h2>User Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
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
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Customer">Customer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <button type="submit" disabled={isPending}>
          {" "}
          {isPending ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
