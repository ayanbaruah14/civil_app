import API from "./api";

/* ============== CLIENT ================= */

// Get projects posted by logged-in client
export const GetMyProjectsApi = () =>
  API.get("/lead/my");

// Update project status
export const UpdateProjectStatusApi = (id, status) =>
  API.patch(`/lead/${id}/status`, { status });

// Send project request to specific engineer
export const SendProjectRequestApi = (projectId, engineerId) =>
  API.post(`/lead/${projectId}/request`, { engineerId });

/* ============= ENGINEER ================= */

// Get open projects
export const GetOpenProjectsApi = () =>
  API.get("/lead/open");

// Get requested projects (special to engineer)
export const GetRequestedProjectsApi = () =>
  API.get("/lead/requested");

// Apply to open project
export const ApplyToProjectApi = (projectId, quote) =>
  API.post("lead/apply", { project_id: projectId, quote });
