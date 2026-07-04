import { API_V1_BASE_URL } from "../config";

const BASE_URL = API_V1_BASE_URL;

export const adminApi = {
  login: async (username, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return res.json();
  },

  headers: () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
  }),

  updateProfile: (id, data) =>
    fetch(`${BASE_URL}/admin/profile/${id}`, {
      method: "PUT",
      headers: adminApi.headers(),
      body: JSON.stringify(data),
    }).then(r => r.json()),

  getProjects: () =>
    fetch(`${BASE_URL}/admin/projects`, { headers: adminApi.headers() }).then(r => r.json()),

  createProject: (data) =>
    fetch(`${BASE_URL}/admin/projects`, {
      method: "POST",
      headers: adminApi.headers(),
      body: JSON.stringify(data),
    }).then(r => r.json()),

  updateProject: (id, data) =>
    fetch(`${BASE_URL}/admin/projects/${id}`, {
      method: "PUT",
      headers: adminApi.headers(),
      body: JSON.stringify(data),
    }).then(r => r.json()),

  deleteProject: (id) =>
    fetch(`${BASE_URL}/admin/projects/${id}`, {
      method: "DELETE",
      headers: adminApi.headers(),
    }).then(r => r.json()),

  createExperience: (data) =>
    fetch(`${BASE_URL}/admin/experience`, {
      method: "POST",
      headers: adminApi.headers(),
      body: JSON.stringify(data),
    }).then(r => r.json()),

  updateExperience: (id, data) =>
    fetch(`${BASE_URL}/admin/experience/${id}`, {
      method: "PUT",
      headers: adminApi.headers(),
      body: JSON.stringify(data),
    }).then(r => r.json()),

  deleteExperience: (id) =>
    fetch(`${BASE_URL}/admin/experience/${id}`, {
      method: "DELETE",
      headers: adminApi.headers(),
    }).then(r => r.json()),

  getMessages: () =>
    fetch(`${BASE_URL}/admin/messages`, { headers: adminApi.headers() }).then(r => r.json()),

  markRead: (id) =>
    fetch(`${BASE_URL}/admin/messages/${id}/read`, {
      method: "PUT",
      headers: adminApi.headers(),
    }).then(r => r.json()),

  deleteMessage: (id) =>
    fetch(`${BASE_URL}/admin/messages/${id}`, {
      method: "DELETE",
      headers: adminApi.headers(),
    }).then(r => r.json()),
};
