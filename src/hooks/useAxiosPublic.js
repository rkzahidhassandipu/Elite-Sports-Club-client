import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000/", // or your production URL
  withCredentials: true,
});

const useAxiosPublic = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axiosPublic.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    // Response interceptor
    const responseInterceptor = axiosPublic.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          try {
            await logOut();
            navigate('/')
            console.log("Signed out due to 401/403 error");
          } catch (err) {
            console.error("Sign-out error:", err);
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosPublic.interceptors.request.eject(requestInterceptor);
      axiosPublic.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut]);

  return axiosPublic;
};

export default useAxiosPublic;
