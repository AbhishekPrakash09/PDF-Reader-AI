import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
      "Content-type": "application/json",
    },
});


instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error)
    }
);
  
instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export default instance;
  