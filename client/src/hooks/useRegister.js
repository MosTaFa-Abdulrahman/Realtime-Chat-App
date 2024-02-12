import { useState } from "react";
import { toast } from "react-toastify";
import { makeRequest } from "../requestMethod";
import { useAuthContext } from "../context/AuthContext";

function useRegister() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const handleRegister = async (inputs) => {
    if (
      !inputs.fullName ||
      !inputs.username ||
      !inputs.password ||
      !inputs.gender
    ) {
      return toast.warning("Please fill all the fields 😍");
    }

    setLoading(true);

    try {
      const res = await makeRequest.post("auth/register", inputs);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setAuthUser(res.data);
    } catch (error) {
      toast.error(`Error Register 😥`);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleRegister };
}

export default useRegister;
