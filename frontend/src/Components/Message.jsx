import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../Context/ChatContext";
import EllipsisWithDelete from "./EllipsisWithDelete";
import { useState } from "react";
import { ImagePreview } from "./ImagePreview";

const Message = ({ message, del }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(message.img);
  const [isReplying, setReplying] = useState(false);

  const openImagePreview = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setIsPreviewOpen(true);
  };

  const closeImagePreview = () => {
    setSelectedImageUrl("");
    setIsPreviewOpen(false);
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const docRef = doc(db, "chats", data.chatId);
  const handleDelete = async () => {
    try {
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        let yourArray = docSnapshot.data().messages;
        yourArray = yourArray.filter((data, index) => index !== del);

        await updateDoc(docRef, { messages: yourArray });
      } else {
        console.log("Document does not exist.");
      }
    } catch (error) {
      console.error(
        "Error accessing and deleting from array in document:",
        error
      );
    }
  };

  const handleLikeClick = async (e) => {
    if (message.senderId !== currentUser._id) {
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        let yourArray = docSnapshot.data().messages;
        yourArray[del].isLike = e;
        await updateDoc(docRef, { messages: yourArray });
      }
    }
  };

  return (
    <div
      ref={ref}
      className={` flex items-center gap-[10px] mb-2 opacity-100 ${
        message.senderId === currentUser._id && "flex-row-reverse"
      } ${isReplying && "opacity-50"}`}
    >
      <div className={`relative max-w-[80%] flex flex-col ${message.isLike && "mb-2"}`}>
        {data.isGroupChat && message.senderId !== currentUser._id && (
          <span className="text-[0.7rem] text-start">{message.senderName}</span>
        )}

        <span className="flex items-center gap-1">
          <p
            id={message.id}
            onDoubleClick={() => handleLikeClick(true)}
            className={`bg-[#ccccff] max-w-max px-5 py-2.5 cursor-pointer select-none ${
              message.senderId === currentUser._id
                ? "rounded-[10px_0px_10px_10px]"
                : "rounded-[0px_10px_10px_10px]"
            }`}
          >
            {message.img ? (
              <img
                onClick={() => openImagePreview(message.img)}
                className="h-16 w-16"
                src={message.img}
                alt=""
              />
            ) : (
              `${message.text}`
            )}
            {isPreviewOpen && (
              <ImagePreview
                imageUrl={selectedImageUrl}
                onClose={closeImagePreview}
              />
            )}

            <span className="text-gray-600 text-xs ml-2 ">
              {message.date.toDate().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {currentUser._id === message.senderId && (
              <EllipsisWithDelete
                isMessageEllipsis={true}
                onDelete={() => handleDelete(message)}
              />
            ) }
          </p>
          <i
            className="fa-solid fa-reply cursor-pointer"
            onClick={() => setReplying(!isReplying)}
          ></i>
        </span>
        {message.isLike && (
          <i
            className="fa-solid fa-heart z-10 absolute top-[90%] left-3"
            style={{ color: "red" }}
            onClick={() => handleLikeClick(false)}
          ></i>
        )}
      </div>
    </div>
  );
};

export default Message;
