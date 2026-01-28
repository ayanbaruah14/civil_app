import { useState } from "react";
import { loginApi } from "../api/auth_api";
import { InputError } from "../components/InputErrors";
import { Navigate } from "react-router-dom";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await loginApi(form);
      localStorage.setItem("token", res.data.token);
      window.location.href =
        res.data.role === "CLIENT" ? "/client" : "/engineer";
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        <input
          className="input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <InputError error={errors.email} />

        <input
          className="input mt-3"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <InputError error={errors.password} />

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>

<div className="flex items-center justify-center gap-1">
  <span>New here?</span>
  <a
    href="/signup"
    className="text-blue-600 hover:text-blue-800 font-medium underline"
  >
    Create account
  </a>
</div>




      </form>
    </div>
  );
}
