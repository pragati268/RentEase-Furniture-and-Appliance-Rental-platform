import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api.js";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);

      alert("Login successful!");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="shadow-lg p-8 rounded-xl w-[90%] md:w-[50%] lg:w-[25%]">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-3 mb-4 rounded"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-3 mb-4 rounded"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          className="bg-black text-white w-full py-3 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;