import { useEffect, useState } from "react";
import {
  GetOpenProjectsApi,
  GetRequestedProjectsApi,
  ApplyToProjectApi,
  GetAppliedLeadsApi,
} from "../api/lead_auth_api";

export const EngineerDashboard = () => {
  const [appliedLeads, setAppliedLeads] = useState([]);

  const [openProjects, setOpenProjects] = useState([]);
  const [requestedProjects, setRequestedProjects] = useState([]);
  const [quotes, setQuotes] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  const fetchAll = async () => {
    try {
      const [openRes, requestedRes,appliedRes] = await Promise.all([
        GetOpenProjectsApi(),
        GetRequestedProjectsApi(),
         GetAppliedLeadsApi(),
      ]);

      setOpenProjects(openRes.data);
      setRequestedProjects(requestedRes.data);
       setAppliedLeads(appliedRes.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
      alert("Failed to load projects ❌");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);


  /* ================= APPLY ================= */

  const applyToProject = async (projectId) => {
    const quote = quotes[projectId];

    if (!quote) {
      alert("Please enter a quote");
      return;
    }

    try {
      setLoadingId(projectId);

      await ApplyToProjectApi(projectId, quote);

      alert("✅ Applied successfully!");

      // clear quote input
      setQuotes((prev) => ({ ...prev, [projectId]: "" }));

      // refresh open projects (optional but correct)
      fetchAll();
    } catch (err) {
      console.error("Apply failed", err);
      alert(
        err?.response?.data?.message ||
          "❌ Failed to apply (maybe already applied)"
      );
    } finally {
      setLoadingId(null);
    }
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


      {/* APPLIED LEADS */}
<h2 className="font-semibold mb-3">Leads You Applied To</h2>

{appliedLeads.length === 0 && (
  <p className="text-gray-500 mb-6">You haven’t applied to any leads yet</p>
)}

<div className="grid md:grid-cols-2 gap-4 mb-10">
  {appliedLeads.map((lead) => (
    <div key={lead._id} className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{lead.title}</h3>
      <p>Location: {lead.location}</p>
      <p>Budget: {lead.budget}</p>
      <p>
        Status:{" "}
        <span
          className={
            lead.status === "completed"
              ? "text-green-600 font-semibold"
              : "text-yellow-600 font-semibold"
          }
        >
          {lead.status}
        </span>
      </p>

      <span className="text-gray-500 text-sm">
        Already applied
      </span>
    </div>
  ))}
</div>

    </div>
  );
};
