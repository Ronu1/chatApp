import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { db } from "../firebase";
import {  fetchChats } from "../redux/features/ChatSlice";
import { useSelector, useDispatch } from "react-redux";

const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const reduxDispatch = useDispatch();
  const chatData = useSelector((state) => state.chat.chatData);

  useEffect(() => {
    currentUser.id && reduxDispatch(fetchChats());
  }, [currentUser.id]);

  const handleSelect = async (u) => {
    const res = await getDoc(doc(db, "chats", u.id));
    if (!res.exists()) {
        await setDoc(doc(db, "chats", u.id), { messages: [] });
    }
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="">
      {chatData &&
        chatData.map((data) =>
           {
            return (
              <div
                key={data._id}
                className={`flex  items-center p-3 py-[6px] justify-between border-b border-[#a4a4ff] hover:bg-[#b9b9ff] `}
                onClick={() => handleSelect(data)}
              >
                <div className="w-3/4 flex items-center p-1">
                  <div className="  cursor-pointer px-4">
                    <img
                      className="h-9 w-9 rounded-[50%]"
                      src={data.isGroupChat ? data.groupPic : data.users[0].pic}
                    />
                  </div>

                  <div className="flex flex-col ">
                    <span className="capitalize font-semibold text-[16px] text-start">
                      {data.isGroupChat ? data.chatName : data.users[0].name}
                    </span>
                    <p className="text-[14px] text-start">
                      {data.latestMessage?.content
                        ? data.isGroupChat
                          ? `${data.latestMessage.sender.name} : ${data.latestMessage.content}`
                          : data.latestMessage.content
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="text-xs p-1 flex gap-2">
                  <span className="time-meta pull-right">
                    {new Date(
                      data.latestMessage?.updatedAt
                        ? data.latestMessage.updatedAt
                        : data.updatedAt
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "IST",
                    })}
                  </span>
                </div>
              </div>
            );
          }
        )}
    </div>
  );
};

export default Chats;
