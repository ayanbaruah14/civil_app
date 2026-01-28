import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const signupApi = (data) => API.post("/auth/signup", data);
export const loginApi = (data) => API.post("/auth/login", data);
