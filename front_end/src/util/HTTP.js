import axios from "axios";
const axiosApiInstance=  axios.create({
  baseURL: "http://localhost:4000/api/navicom",
  headers: {
    "Content-type": "application/json"
  }
});

export default axiosApiInstance;