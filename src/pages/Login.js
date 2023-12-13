import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isPending, setIsPending] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value === "")) {
      console.log("Please fill in all fields.");
      return;
    }

    setIsPending(true);

    try {
      const response = await fetch(
        "https://eagle-backend-ekxb.onrender.com/create/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status !== 200) {
        throw new Error("Login failed.");
      }

      const { token, role } = await response.json();

      document.cookie = `authToken=${token}`;
      document.cookie = `role=${role}`;
      alert("Login successful!");

      window.location = "/";
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("Login failed");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email/Phone:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
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
        <button type="submit" disabled={isPending}>
          {isPending ? "Logging In..." : "Log In"}
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
