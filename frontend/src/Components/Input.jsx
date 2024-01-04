import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
import Loading from "../gif/Loading.gif";
import { useEffect } from "react";
import InputEmoji from "react-input-emoji";
import { useDispatch } from "react-redux";
import { sendMessage } from "../redux/features/messageSlice";

const Input = () => {
  const [img, setImg] = useState(null);
  const [url, setUrl] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const dispatch = useDispatch();

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const postDetails = (profilePic) => {
    const form = new FormData();
    form.append("file", profilePic);
    form.append("upload_preset", "chat-app");
    form.append("cloud_name", "ronitbrilworks");
    fetch("https://api.cloudinary.com/v1_1/ronitbrilworks/image/upload", {
      method: "post",
      body: form,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (img) {
      setLoading(true);
      postDetails(img);
    }
  }, [img]);

  const handleSend = async () => {
    if (!loading && (selectedEmoji !== "" || url !== "")) {
      if (img) {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            senderId: currentUser._id,
            senderName: currentUser.name,
            date: Timestamp.now(),
            img: url,
          }),
        });
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            senderName: currentUser.name,
            text: selectedEmoji,
            senderId: currentUser._id,
            date: Timestamp.now(),
          }),
        });
      }
      dispatch(sendMessage({ message: selectedEmoji, chatId: data.chatId }));
      
    }

    setSelectedEmoji("");
    setUrl("");
    setImg(null);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="h-[50px] bg-[#ddddf7] flex items-center justify-between pl-0 p-2.5">
      {data && (
        <>
          <InputEmoji
            value={selectedEmoji}
            onChange={setSelectedEmoji}
            cleanOnEnter
            onKeyDown={handleKeyPress}
            className="w-[100%]  px-2 py-1 font-medium outline-none text-[#031526] rounded-s-lg "
            placeholder="Enter your text here!"
          />
          <div className="flex items-center gap-[10px]">
            <div className="relative inline-block">
              <i className="fa-solid fa-paperclip" onClick={toggleDropdown}></i>
              {dropdownVisible && (
                <div className="absolute right-0 w-28   bottom-full mt-2 bg-white border border-black p-1 rounded shadow-md">
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                  <label className="text-sm" htmlFor="file">
                    Send Image
                  </label>
                </div>
              )}
            </div>
            {loading ? (
              <div className="h-[36px] w-[66px] flex items-center justify-center mx-auto">
                <img className="h-[35px] w-[35px]" src={Loading} alt="" />
              </div>
            ) : (
              <button
                className="border-none py-[10px] px-[15px] text-white rounded-xl bg-[#8c8cff] cursor-pointer"
                onClick={handleSend}
              >
                Send
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Input;
