import { useEffect, useState } from "react";
import {
  CreateProjectApi,
  GetAllEngineersApi,
} from "../api/auth_api"; // adjust path if needed

export const ClientDashboard = () => {
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    location: "",
    budget: "",
    floors: "",
  });

  useEffect(() => {
    fetchEngineers();
  }, []);

  // Fetch available engineers
  const fetchEngineers = async () => {
    try {
      const res = await GetAllEngineersApi();
      setEngineers(res.data);
    } catch (err) {
      console.error("Failed to fetch engineers", err);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit project
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await CreateProjectApi({
        title: form.title,
        location: form.location,
        budget: Number(form.budget),
        floors: Number(form.floors),
      });

      alert("Lead posted successfully ✅");

      setForm({
        title: "",
        location: "",
        budget: "",
        floors: "",
      });
    } catch (err) {
      console.error("Post failed", err);
      alert("Failed to post lead ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Client Dashboard</h1>

      {/* POST LEAD */}
      <div className="bg-white p-4 rounded shadow mb-6 max-w-lg">
        <h2 className="font-semibold mb-3">Post New Requirement</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="input"
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="budget"
            placeholder="Budget"
            value={form.budget}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="floors"
            placeholder="No. of Floors"
            value={form.floors}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60"
          >
            {loading ? "Posting..." : "Post Lead"}
          </button>
        </form>
      </div>

      {/* ENGINEERS LIST */}
      <h2 className="font-semibold mb-3">Available Engineers</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {engineers.map((eng) => (
          <div key={eng._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{eng.user_id?.name}</h3>
            <p>Type: {eng.engineer_type}</p>
            <p>Experience: {eng.experience} years</p>
            <p>Degree: {eng.max_degree}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
