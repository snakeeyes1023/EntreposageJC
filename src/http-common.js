import axios from "axios";
import router from "./router";
let axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_URL_API,  
});


/**
 * Lorsque requête est envoyé (NE PAS METTRE DIRECT DANS L'INSTANCE AXIOS)
 * On ajoute le token dans le header
 * On ajoute le content-type dans le header
 */
axiosInstance.interceptors.request.use(
  function (config) {
    config.headers = {
      "Content-type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


/**
 * Lorsque requête est recu et que le status est 401
 * On supprime le token et on redirige vers la page de login
 */
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  }
  , (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      router.push("/auth/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;