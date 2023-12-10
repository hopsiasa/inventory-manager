import axios from "axios";
import { parseCookies, setCookie } from "nookies";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the Bearer token from cookies in the request headers
api.interceptors.request.use(
  async (config) => {
    // Get the Bearer token from cookies
    const token = getBearerTokenFromCookies();

    // Add the Bearer token to the Authorization header
    if (config.headers) {
      config.headers.Authorization = token ? `Bearer ${token}` : "";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor to handle token expiration and refresh tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const newToken = await refreshAccessToken();

        // Update the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Retry the original request
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to the login page or handle as needed
        console.error("Failed to refresh token:", refreshError);
        // Redirect to login or handle the error
      }
    }

    return Promise.reject(error);
  }
);

// Function to get the Bearer token from cookies
export const getBearerTokenFromCookies = () => {
  const parsedCookies = parseCookies();
  return parsedCookies["accessToken"];
};

// Function to refresh the access token
export const refreshAccessToken = async () => {
  const refreshToken = parseCookies().refreshToken;

  if (!refreshToken) {
    throw new Error("Refresh token not available");
  }

  try {
    const response = await api.post("/refresh", {
      refresh_token: refreshToken,
    });

    const newAccessToken = response.data.access_token;

    // Update the access token in cookies
    setCookie(null, "accessToken", newAccessToken, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // Set the expiration time for the access token
    });

    return newAccessToken;
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};

export default api;
