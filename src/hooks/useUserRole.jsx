import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic"; // or axiosPublic
import useAuth from "../hooks/useAuth";

const useUserRole = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: role = "user", isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/role/${user.email}`);
      return res.data.userRole;
    },
    enabled: !!user?.email,
  });

  return { role, isLoading };
};

export default useUserRole;
