import axios from "axios";
const axiosApiInstance=  axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-type": "application/json"
  }
});

export default axiosApiInstance;