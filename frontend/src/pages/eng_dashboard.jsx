import { useEffect, useState } from "react";
import axios from "axios";

export const EngineerDashboard=()=> {
  const [projects, setProjects] = useState([]);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:4000/api/project/open", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setProjects(res.data);
  };

  const applyToProject = async (projectId) => {
    await axios.post(
      "http://localhost:4000/api/apply",
      { project_id: projectId, quote },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert("Applied successfully");
    setQuote("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Engineer Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div key={proj._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{proj.title}</h3>
            <p>Location: {proj.location}</p>
            <p>Budget: {proj.budget}</p>
            <p>Floors: {proj.floors}</p>

            <input
              className="input mt-3"
              placeholder="Your Quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />

            <button
              onClick={() => applyToProject(proj._id)}
              className="mt-3 w-full bg-green-600 text-white py-2 rounded"
            >
              Apply
            </button>

            {/* Call Client */}
            <a
              href={`tel:${proj.client_phone}`}
              className="block text-center mt-2 text-blue-600 underline"
            >
              Call Client
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
