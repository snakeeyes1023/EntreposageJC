import axios from "axios";

export default axios.create({
  baseURL: process.env.VUE_APP_URL_API,
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("token"),
  },
  
});