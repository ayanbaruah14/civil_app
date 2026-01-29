import API from "./api";

/* ============== CLIENT ================= */

// Get projects posted by logged-in client
export const GetMyProjectsApi = () =>
  API.get("/project/my");

// Update project status
export const UpdateProjectStatusApi = (id, status) =>
  API.patch(`/project/${id}/status`, { status });

// Send project request to specific engineer
export const SendProjectRequestApi = (projectId, engineerId) =>
  API.post(`/project/${projectId}/request`, { engineerId });

/* ============= ENGINEER ================= */

// Get open projects
export const GetOpenProjectsApi = () =>
  API.get("/project/open");

// Get requested projects (special to engineer)
export const GetRequestedProjectsApi = () =>
  API.get("/project/requested");

// Apply to open project
export const ApplyToProjectApi = (projectId, quote) =>
  API.post("/apply", { project_id: projectId, quote });
