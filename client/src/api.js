import { APP_CONFIG } from "./utils/constants";
const apiCall = async (endpoint, method = "GET", body = null, token = null) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const response = await fetch(`${APP_CONFIG.apiUrl}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "API Error");
    return data;
  } catch (error) {
    console.error("API Call Failed:", error);
    throw error;
  }
};

export default apiCall;
