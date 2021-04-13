import axios from "axios";

// Here we are creating instances of axios.
const instance = axios.create({
  baseURL: "http://localhost:9000",
});

export default instance;