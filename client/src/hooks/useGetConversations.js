import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { makeRequest } from "../requestMethod";

function useGetConversations() {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await makeRequest.get("/user/get");
        if (!res.data) {
          toast.error("Conversations Not Found 😥");
        } else setConversations(res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
}

export default useGetConversations;
