import  { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../Context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="flex-[2]">
      <div className="h-[50px] bg-[#eee] flex items-center gap-4 capitalize text-[black] p-2.5">
        <img
          className="h-10 w-10 rounded-[50%]"
          src={data.isGroupChat? data.groupPic:data.users[0]?.pic}
          alt=""
        />
        <span>{data.isGroupChat  ? data.chatName : data.users[0]?.name}</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
