import { useEffect, useState } from "react";
import {
  GetOpenProjectsApi,
  GetRequestedProjectsApi,
  ApplyToProjectApi,
} from "../api/lead_auth_api";

export const EngineerDashboard = () => {
  const [openProjects, setOpenProjects] = useState([]);
  const [requestedProjects, setRequestedProjects] = useState([]);
  const [quotes, setQuotes] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const open = await GetOpenProjectsApi();
    const requested = await GetRequestedProjectsApi();
    setOpenProjects(open.data);
    setRequestedProjects(requested.data);
  };

  const applyToProject = async (projectId) => {
    const quote = quotes[projectId];
    if (!quote) return alert("Enter quote");

    setLoadingId(projectId);
    await ApplyToProjectApi(projectId, quote);
    setQuotes({ ...quotes, [projectId]: "" });
    setLoadingId(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Engineer Dashboard</h1>

      {/* OPEN PROJECTS */}
      <h2 className="font-semibold mb-3">Open Leads</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {openProjects.map((proj) => (
          <div key={proj._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{proj.title}</h3>
            <p>Status: {proj.status}</p>

            <input
              className="input mt-2"
              placeholder="Your quote"
              value={quotes[proj._id] || ""}
              onChange={(e) =>
                setQuotes({ ...quotes, [proj._id]: e.target.value })
              }
            />

            <button
              onClick={() => applyToProject(proj._id)}
              disabled={loadingId === proj._id}
              className="mt-2 w-full bg-green-600 text-white py-2 rounded"
            >
              {loadingId === proj._id ? "Applying..." : "Apply"}
            </button>
          </div>
        ))}
      </div>

      {/* REQUESTED PROJECTS */}
      <h2 className="font-semibold mb-3">Requested For You</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {requestedProjects.map((proj) => (
          <div
            key={proj._id}
            className="bg-white p-4 rounded shadow border-2 border-blue-500"
          >
            <h3 className="font-semibold">{proj.title}</h3>
            <p>Status: {proj.status}</p>
            <span className="text-blue-600 font-semibold">
              Direct request from client
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
