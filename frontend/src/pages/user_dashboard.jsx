import { useEffect, useState } from "react";
import axios from "axios";

export const ClientDashboard=()=> {
  const [engineers, setEngineers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    location: "",
    budget: "",
    floors: "",
  });

  useEffect(() => {
    fetchEngineers();
  }, []);

  const fetchEngineers = async () => {
    const res = await axios.get("http://localhost:4000/api/engineer/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setEngineers(res.data);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:4000/api/project", form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    alert("Lead posted successfully");
    setForm({ title: "", location: "", budget: "", floors: "" });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Client Dashboard</h1>

      {/* POST LEAD */}
      <div className="bg-white p-4 rounded shadow mb-6 max-w-lg">
        <h2 className="font-semibold mb-3">Post New Requirement</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="input" name="title" placeholder="Project Title" onChange={handleChange} />
          <input className="input" name="location" placeholder="Location" onChange={handleChange} />
          <input className="input" name="budget" placeholder="Budget" onChange={handleChange} />
          <input className="input" name="floors" placeholder="No. of Floors" onChange={handleChange} />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Post Lead
          </button>
        </form>
      </div>

      {/* ENGINEERS LIST */}
      <h2 className="font-semibold mb-3">Available Engineers</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {engineers.map((eng) => (
          <div key={eng._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{eng.user_id.name}</h3>
            <p>Type: {eng.engineer_type}</p>
            <p>Experience: {eng.experience} years</p>
            <p>Degree: {eng.max_degree}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

