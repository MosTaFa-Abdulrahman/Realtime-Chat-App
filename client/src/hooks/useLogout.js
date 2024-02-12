import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { makeRequest } from "../requestMethod";

function useLogout() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const handleLogout = async () => {
    setLoading(true);

    try {
      await makeRequest.post("/auth/logout");
      localStorage.removeItem("userInfo");
      setAuthUser(null);
    } catch (error) {
      toast.error(`Error Logout 😥`);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading };
}

export default useLogout;
