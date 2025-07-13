import React from "react";
import { FaUser } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading/Loading";
import useUserRole from "../../hooks/useUserRole";
import useUserInfo from "../../hooks/useUserInfo";

const Profile = () => {
  const { user } = useAuth();
  const { userInfo, isLoading } = useUserInfo();
  const lastSignIn = new Date(user?.metadata?.creationTime);
  const formattedTime = lastSignIn.toLocaleString();
  const { role } = useUserRole();
  const { membershipDate = null } = userInfo || {};

  if (!user || !userInfo || isLoading) return <Loading />;

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md rounded-md border border-white/10 p-6 space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaUser /> My Profile
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-300">Name</p>
            <p className="font-semibold">{user.displayName || "No Name"}</p>
          </div>
          <div>
            <p className="text-gray-300">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-300">Registration Date</p>
            <p>
              {role === "member" ? (
                <p>
                  Member Since:{" "}
                  {membershipDate
                    ? new Date(membershipDate).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </p>
              ) : (
                <p>Joined On: {formattedTime}</p>
              )}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Status</p>
            <span className="inline-block bg-blue-800/80 text-blue-200 px-4 py-1 rounded-full text-xs font-medium shadow-sm">
              {role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
