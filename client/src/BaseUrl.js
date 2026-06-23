import axios from "axios";

export const BaseUrl = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
