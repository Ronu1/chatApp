import { doc, onSnapshot } from "firebase/firestore";
import  { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });


    return () => {
      unSub();
    };
  }, [data.chatId]);


  return (
    <div className="bg-[#ddddf7] h-[calc(100%_-_110px)] overflow-y-scroll scroll-smooth p-2.5 scrollbar-style  ">
      {messages.map((message, index) => (
        <Message message={message} del={index} key={message.id} />
      ))}
    </div>
  );
};

export default Messages;
