import axios from "axios";
import { toast } from "react-toastify";
import serverErrorHandler from "../helpers/serverErrorHandler";
const axiosInstance = axios.create({
  baseURL: "https://ruxegubfleaphadbqgaz.supabase.co",
  headers: {
    "Content-Type": "application/json",
    apiKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1eGVndWJmbGVhcGhhZGJxZ2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3ODg3MDgsImV4cCI6MjAzNjM2NDcwOH0.15e7CMQfLQsD4LM43ukjz46kZvDVkEy47JpyLPgeHKM",
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const message = serverErrorHandler(error);
    toast.error(message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
