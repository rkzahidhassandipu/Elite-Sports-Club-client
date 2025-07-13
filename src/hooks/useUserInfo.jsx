// hooks/useUserInfo.js
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic"; // Adjust path as needed
import useAuth from "./useAuth"; // To get current user

const useUserInfo = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["user-info", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user.email}`);
      return res.data.user; // assuming your API sends { success, user }
    },
    enabled: !!user?.email,
  });

  return { userInfo: data, isLoading };
};

export default useUserInfo;
