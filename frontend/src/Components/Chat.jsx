import  { useContext, useState } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../Context/ChatContext";
import ChatDetails from "./ChatDetails";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    if (data.chatId !== "null")
     setIsOpen(!isOpen);
  };
  return (
    <div className="flex-[2] h-full">
      <div
        className="h-[60px] bg-[#adadff] flex items-center gap-4 capitalize text-[black] p-2.5"
        onClick={toggleSidebar}
      >
        <img
          className="h-10 w-10 rounded-[50%]"
          src={data.isGroupChat ? data.groupPic : data.users[0]?.pic}
          alt=""
        />
        <span>{data.isGroupChat ? data.chatName : data.users[0]?.name}</span>
      </div>
      <div
        className={`fixed inset-y-0 right-0 w-72 my-auto h-[calc(100%_-_1.2%)] bg-[#adadff] transition-transform duration-300 transform ${
          isOpen ? "translate-x-0 z-[1001]" : "translate-x-full z-[1001]"
        }`}
      >
        <ChatDetails />
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
