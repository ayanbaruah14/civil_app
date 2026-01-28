import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach JWT automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ================= AUTH ================= */
export const SignupApi = (data) => API.post("/auth/signup", data);
export const LoginApi = (data) => API.post("/auth/login", data);

/* ============== CLIENT ================== */
// Post new project
export const CreateProjectApi = (data) => API.post("/project", data);

// Get all engineers
export const GetAllEngineersApi = () => API.get("/engineer/all");

/* ============= ENGINEER ================= */
// Get open projects
export const GetOpenProjectsApi = () => API.get("/project/open");

// Apply to project
export const ApplyToProjectApi = (data) => API.post("/apply", data);
