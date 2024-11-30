import axiosInstance from "./axios-instance"

export const clearCredentials = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
  };

export const validateToken = async () => {
    try {
      const response = await axiosInstance.post("/api/token/refresh", {refresh: localStorage.getItem("refresh")});
      const newAccessToken = response.data.access;
      localStorage.setItem("token", newAccessToken);
      return response.status == 200;
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
    return false;
  };

export const login = async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post("/api/token/", {
        username,
        password,
      });
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refresh", refreshToken);
      return response.status == 200;
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  };
