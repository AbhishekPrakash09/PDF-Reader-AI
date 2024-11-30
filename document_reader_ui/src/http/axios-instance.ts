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
  

export default instance;
  