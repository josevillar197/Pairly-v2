const API_URL = "http://localhost:5005/api";


function getAuthToken() {
  return localStorage.getItem("authToken");
}


function authFetch(url, options = {}) {
  const token = getAuthToken();

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
}


export function getDiscoverUsers() {
  return fetch(`${API_URL}/taste-items`).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch taste items");
    }
    return res.json();
  });
}



export function login(email, password) {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Login failed");
    }
    return res.json();
  });
}

export function addUserTaste(tasteItemId) {
  return authFetch(`${API_URL}/user-tastes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tasteItemId,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to add user taste");
    }
    return res.json();
  });
}

export function getUserTastes() {
  return authFetch(`${API_URL}/user-tastes`).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch user tastes");
    }
    return res.json();
  });
}
export function removeUserTaste(userTasteId) {
  return authFetch(`${API_URL}/user-tastes/${userTasteId}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to delete user taste");
    }
  });
}
export function verifyToken() {
  const token = localStorage.getItem("authToken");

  return fetch(`${API_URL}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Token invalid");
    }
    return res.json();
  });
}
export function getTasteItems() {
  return fetch(`${API_URL}/taste-items`).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch taste items");
    }
    return res.json();
  });
}
export function signup(email, password, name) {
  return fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new Error(data.message || "Signup failed");
      });
    }
    return res.json();
  });
}

