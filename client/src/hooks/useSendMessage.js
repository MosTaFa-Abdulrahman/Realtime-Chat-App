import { useState } from "react";
import { toast } from "react-toastify";
import { makeRequest } from "../requestMethod";
import useConversation from "../zustand/ConversationZustand";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);

    try {
      if (!message) return toast.warning("Please Enter Your Message 🥰");

      const res = await makeRequest.post(
        `/message/send/${selectedConversation._id}`,
        { message }
      );
      setMessages([...messages, res.data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
}

export default useSendMessage;
