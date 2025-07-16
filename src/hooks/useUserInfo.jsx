// hooks/useUserInfo.js
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useUserInfo = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: userInfo,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user-info", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user.email}`);
      return res.data?.user || null; // safe fallback
    },
    enabled: !!user?.email, // run only if email exists
    staleTime: 5 * 60 * 1000, // optional: cache for 5 mins
  });

  return { userInfo, isLoading, error, refetch };
};

export default useUserInfo;

