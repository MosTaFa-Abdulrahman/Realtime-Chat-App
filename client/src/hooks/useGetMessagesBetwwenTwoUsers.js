import { useEffect, useState } from "react";
import useConversation from "../zustand/ConversationZustand";
import { toast } from "react-toastify";
import { makeRequest } from "../requestMethod";

function useGetMessagesBetwwenTwoUsers() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await makeRequest.get(
          `/message/get/${selectedConversation._id}`
        );
        if (!res.data) return toast.error("Messages 2 Users not found 😥");
        else setMessages(res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
}

export default useGetMessagesBetwwenTwoUsers;
