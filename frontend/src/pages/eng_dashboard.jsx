import { useEffect, useState } from "react";
import {
  GetOpenProjectsApi,
  ApplyToProjectApi,
} from "../api/auth_api"; // adjust path if needed

export const EngineerDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [quotes, setQuotes] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch open projects
  const fetchProjects = async () => {
    try {
      const res = await GetOpenProjectsApi();
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  // Apply to project
  const applyToProject = async (projectId) => {
    const quote = quotes[projectId];

    if (!quote) {
      alert("Please enter a quote");
      return;
    }

    try {
      setLoadingId(projectId);

      await ApplyToProjectApi({
        project_id: projectId,
        quote,
      });

      alert("Applied successfully ✅");

      // Clear quote for this project
      setQuotes((prev) => ({ ...prev, [projectId]: "" }));
    } catch (err) {
      console.error("Apply failed", err);
      alert("Failed to apply ❌");
    } finally {
      setLoadingId(null);
    }
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
              value={quotes[proj._id] || ""}
              onChange={(e) =>
                setQuotes({ ...quotes, [proj._id]: e.target.value })
              }
            />

            <button
              onClick={() => applyToProject(proj._id)}
              disabled={loadingId === proj._id}
              className="mt-3 w-full bg-green-600 text-white py-2 rounded disabled:opacity-60"
            >
              {loadingId === proj._id ? "Applying..." : "Apply"}
            </button>

            {/* Call Client */}
            {proj.client_phone && (
              <a
                href={`tel:${proj.client_phone}`}
                className="block text-center mt-2 text-blue-600 underline"
              >
                Call Client
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
