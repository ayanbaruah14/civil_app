import { useEffect, useState } from "react";
import {
  CreateProjectApi,
  GetAllEngineersApi,
} from "../api/auth_api";

import {
  GetMyProjectsApi,
  UpdateProjectStatusApi,
  SendProjectRequestApi,
} from "../api/lead_auth_api";

export const ClientDashboard = () => {
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    location: "",
    budget: "",
    floors: "",
  });

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    fetchEngineers();
    fetchMyProjects();
  }, []);

  const fetchEngineers = async () => {
    try {
      const res = await GetAllEngineersApi();
      setEngineers(res.data);
    } catch (err) {
      console.error("Fetch engineers failed", err);
    }
  };

  const fetchMyProjects = async () => {
    try {
      const res = await GetMyProjectsApi();
      setProjects(res.data);
    } catch (err) {
      console.error("Fetch projects failed", err);
    }
  };

  /* ================= FORM ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await CreateProjectApi({
        title: form.title,
        location: form.location,
        budget: Number(form.budget),
        floors: Number(form.floors),
      });

      setForm({
        title: "",
        location: "",
        budget: "",
        floors: "",
      });

      const res = await GetMyProjectsApi();
      setProjects(res.data);

          const postedLead = res.data.find(
      (p) => p.title === form.title
    );

    if (postedLead) {
      alert("✅ Lead posted successfully! You can now manage it in My Leads.");
    }
    } catch (err) {
      alert("Failed to post lead ❌");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Client Dashboard</h1>

      {/* POST LEAD */}
      <div className="bg-white p-4 rounded shadow mb-8 max-w-lg">
        <h2 className="font-semibold mb-3">Post New Requirement</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="input" name="title" placeholder="Project Title" value={form.title} onChange={handleChange} required />
          <input className="input" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
          <input className="input" name="budget" placeholder="Budget" value={form.budget} onChange={handleChange} required />
          <input className="input" name="floors" placeholder="Floors" value={form.floors} onChange={handleChange} required />

          <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
            {loading ? "Posting..." : "Post Lead"}
          </button>
        </form>
      </div>

      {/* MY LEADS */}
      <h2 className="font-semibold mb-3">My Leads</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {projects.map((proj) => (
          <div key={proj._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{proj.title}</h3>
            <p>Status: <b>{proj.status}</b></p>

            {proj.status === "active" && (
              <button
                onClick={() => {
                  UpdateProjectStatusApi(proj._id, "completed");
                  fetchMyProjects();
                }}
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
              >
                Mark Completed
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ALL ENGINEERS */}
      <h2 className="font-semibold mb-3">All Engineers</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {engineers.map((eng) => (
          <div key={eng._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{eng.user_id?.name}</h3>
            <p>Type: {eng.engineer_type}</p>
            <p>Experience: {eng.experience} yrs</p>

            <select
              className="input mt-2"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) {
                  SendProjectRequestApi(e.target.value, eng._id);
                  alert("Request sent ✅");
                }
              }}
            >
              <option value="">Send request for lead</option>
              {projects
                .filter((p) => p.status === "active")
                .map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.title}
                  </option>
                ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};
