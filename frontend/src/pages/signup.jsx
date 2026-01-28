import { useState } from "react";
import { signupApi } from "../api/auth_api";
import { InputError } from "../components/InputErrors";

export default function Signup() {
  const [role, setRole] = useState("CLIENT");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    engineer_type: "",
    max_degree: "",
    experience: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const payload =
        role === "CLIENT"
          ? { role, name: form.name, email: form.email, password: form.password }
          : { role, ...form };

      const res = await signupApi(payload);
      localStorage.setItem("token", res.data.token);
      window.location.href = role === "CLIENT" ? "/client" : "/engineer";
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Signup</h2>

        {/* ROLE SWITCH */}
        <div className="flex gap-2 mb-4">
          {["CLIENT", "ENGINEER"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded ${
                role === r
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* NAME */}
        <input
          className="input"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <InputError error={errors.name} />

        {/* EMAIL */}
        <input
          className="input mt-3"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <InputError error={errors.email} />

        {/* PASSWORD */}
        <input
          className="input mt-3"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <InputError error={errors.password} />

        {/* ENGINEER FIELDS */}
        {role === "ENGINEER" && (
          <>
            <input
              className="input mt-3"
              name="engineer_type"
              placeholder="Engineer Type"
              onChange={handleChange}
            />
            <InputError error={errors.engineer_type} />

            <input
              className="input mt-3"
              name="max_degree"
              placeholder="Max Degree"
              onChange={handleChange}
            />
            <InputError error={errors.max_degree} />

            <input
              className="input mt-3"
              name="experience"
              placeholder="Experience (years)"
              onChange={handleChange}
            />
            <InputError error={errors.experience} />
          </>
        )}

        <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded">
          Create Account
        </button>
        <div className="flex items-center justify-center gap-1">
  <span>Already have an account?</span>
  <a
    href="/login"
    className="justi text-blue-600 hover:text-blue-800 font-medium underline"
  >
    Login
  </a>
</div>
      </form>
    </div>
  );
}
