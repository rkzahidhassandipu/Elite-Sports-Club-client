import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosPublic = axios.create({
  baseURL: "https://elite-sports-club-server.onrender.com/", // Or your deployed backend URL
  withCredentials: true, // This sends cookies
});

const useAxiosPublic = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    const interceptor = axiosPublic.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          // await logOut();
          // navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPublic.interceptors.response.eject(interceptor);
    };
  }, [logOut, navigate]);

  return axiosPublic;
};

export default useAxiosPublic;
