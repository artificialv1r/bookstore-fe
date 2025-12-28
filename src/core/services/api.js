import axios from "axios";

let Api = axios.create({
  baseURL: "http://localhost:5234",
});

export default Api;
