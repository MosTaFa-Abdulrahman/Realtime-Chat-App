import { useState } from "react";
import { toast } from "react-toastify";
import { makeRequest } from "../requestMethod";
import { useAuthContext } from "../context/AuthContext";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (inputs) => {
    if (!inputs.username || !inputs.password) {
      return toast.warning("Please fill all the fields 😍");
    }

    setLoading(true);

    try {
      const res = await makeRequest.post("auth/login", inputs);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setAuthUser(res.data);
    } catch (error) {
      toast.error(`Error Login 😥`);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}

export default useLogin;
