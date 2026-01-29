import API from "./api";

/* ================= AUTH ================= */
export const SignupApi = (data) => API.post("/auth/signup", data);
export const LoginApi = (data) => API.post("/auth/login", data);

/* ============== CLIENT ================== */
// Post new project / lead
export const CreateProjectApi = (data) => API.post("/project", data);

// Get all engineers
export const GetAllEngineersApi = () => API.get("/engineer/all");
