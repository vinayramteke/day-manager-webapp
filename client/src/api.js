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

    // Check if response is actually JSON before parsing
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text(); // Get the HTML text to see what went wrong
      console.error("Received non-JSON response:", text);
      throw new Error(
        "Server returned HTML instead of JSON. Check your API URL.",
      );
    }

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "API Error");
    return data;
  } catch (error) {
    console.error("API Call Failed:", error);
    throw error;
  }
};
export default apiCall;
