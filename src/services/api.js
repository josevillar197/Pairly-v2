const API_URL = "http://localhost:5005/api";

/* =========================
   TOKEN HELPERS
========================= */

function getAuthToken() {
  return localStorage.getItem("authToken");
}

function authFetch(url, options = {}) {
  const token = getAuthToken();

  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

/* =========================
   AUTH
========================= */

export function login(email, password) {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  });
}

export function signup(email, password, name) {
  return fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new Error(data.message || "Signup failed");
      });
    }
    return res.json();
  });
}

export function verifyToken() {
  const token = getAuthToken();
  if (!token) {
    return Promise.reject(new Error("No token"));
  }

  return fetch(`${API_URL}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Token invalid");
    return res.json();
  });
}

/* =========================
   TASTES
========================= */

export function getTasteItems() {
  return fetch(`${API_URL}/taste-items`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch taste items");
    return res.json();
  });
}

export function addUserTaste(tasteItemId) {
  return authFetch(`${API_URL}/user-tastes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tasteItemId }),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to add user taste");
    return res.json();
  });
}

export function getUserTastes() {
  return authFetch(`${API_URL}/user-tastes`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch user tastes");
    return res.json();
  });
}

export function removeUserTaste(userTasteId) {
  return authFetch(`${API_URL}/user-tastes/${userTasteId}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to delete user taste");
  });
}
export function getChats() {
  return authFetch(`${API_URL}/chats`).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch chats");
    }
    return res.json();
  });
}
export function getDiscoverUsers() {
  return authFetch(`${API_URL}/users/discover`).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch discover users");
    }
    return res.json();
  });
}

export function updateUserProfile(profileData) {
  return authFetch(`${API_URL}/users/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData)
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to update profile");
    return res.json();
  });
}

export function getSentLikes() {
  return authFetch(`${API_URL}/user-likes/sent/me`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch sent likes");
    return res.json();
  });
}

export function likeUser(userId) {
  return authFetch(`${API_URL}/user-likes/${userId}`, {
    method: "POST",
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to like user");
    return res.json();
  });
}

