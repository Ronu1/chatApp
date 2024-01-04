import React, { useContext, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { AuthContext } from "../Context/AuthContext";
import { useDispatch } from "react-redux";
import {
  addInGroupChat,
  removeFromGroupChat,
  renameGroupChat,
} from "../redux/features/ChatSlice";
import EllipsisWithDelete from "./EllipsisWithDelete";
import { getUser, removeSearchedUser } from "../redux/features/UserSlice";
import CreateGroupModal from "./CreateGroupModal";

const ChatDetails = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const stopEditing = () => {
    setIsEditing(false);
  };

  const handleSubmit = () => {
    dispatch(renameGroupChat({ chatId: data.chatId, chatName: text }));
    setIsEditing(false);
  };

  const onRemove = (e) => {
    dispatch(removeFromGroupChat({ chatId: data.chatId, userId: e }));
  };

  const handleCreateGroup = async () => {
    dispatch(addInGroupChat({ chatId: data.chatId, userId: selectedUsers }));
    dispatch(removeSearchedUser());
    setSelectedUsers([]);
    setModalOpen(false);
  };

  const handleUserSearch = (searchQuery) => {
    dispatch(getUser(searchQuery));
  };

  const removeUserSelect = (tag) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== tag._id));
  };

  const handleUserSelect = (id) => {
    if (selectedUsers.indexOf(id) === -1) {
      setSelectedUsers((temp) => [...temp, id]);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col items-center mb-4">
        <div>
          <img
            src={data.isGroupChat ? data.groupPic : data.users[0]?.pic}
            alt="User"
            className="w-40 h-40 rounded-full mr-2"
          />
        </div>
        <div className=" w-full p-5 border-black mb-2">
          {isEditing && data.isGroupChat ? (
            <div className="flex">
              <input
                type="text"
                value={text !== "" ? text : data.chatName}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                className=" bg-transparent border-b border-white focus:outline-none"
              />
              <button
                className="border-none py-[5px] px-[7px] text-white rounded-xl bg-[#8c8cff] cursor-pointer"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          ) : (
            <p
              className=" text-xl font-semibold "
              onClick={() => setIsEditing(true)}
            >
              {data.isGroupChat ? data.chatName : data.users[0]?.name}
            </p>
          )}
        </div>
        {!data.isGroupChat ? (
          <div>
            <p className="">{data.users[0]?.email}</p>
          </div>
        ) : (
          <>
            {data.users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-1  w-full border-b border-black"
              >
                <div className="flex items-center ">
                  <img
                    src={user.pic}
                    alt=""
                    className="w-10 h-10 rounded-full mr-2 "
                  />
                  <p className=" capitalize p-1">{user.name}</p>
                </div>
                {data.groupAdmin === user._id && (
                  <span className="text-xs">Admin</span>
                )}
                {data.groupAdmin === currentUser.id && (
                  <EllipsisWithDelete
                    isRemove={true}
                    onRemove={() => onRemove(user._id)}
                  />
                )}
              </div>
            ))}
            <div className="flex items-center justify-between p-1  w-full border-b border-black">
              <div className="flex items-center ">
                <img
                  src={currentUser.pic}
                  alt=""
                  className="w-10 h-10 rounded-full mr-2 "
                />
                <p className=" p-1">You</p>
              </div>
              {data.groupAdmin === currentUser._id && (
                <span className="text-xs">Admin</span>
              )}
            </div>
          </>
        )}
      </div>
      {data.isGroupChat && (
        <div>
          <button
            onClick={openModal}
            className="  border bg-[#4e4efe] text-white text-xs font-[bold] tracking-[1px] uppercase transition-transform duration-[80ms] ease-[ease-in] px-[25px] py-3 rounded-[8px] border-solid border-[#4e4efe] active:scale-95 focus:outline-none"
          >
            Add New Member
            <span>
              <i className="fa-solid fa-plus pl-2 text-sm"></i>
            </span>
          </button>
        </div>
      )}
      {isModalOpen && (
        <CreateGroupModal
          addMemberModal={true}
          groupName={data.chatName}
          closeModal={closeModal}
          handleCreateGroup={handleCreateGroup}
          handleUserSearch={handleUserSearch}
          handleUserSelect={(e) => handleUserSelect(e)}
          selectedUsers={selectedUsers}
          userSearch={userSearch}
          setSelectedUsers={setSelectedUsers}
          setUserSearch={setUserSearch}
          removeUserSelect={(e) => removeUserSelect(e)}
        />
      )}
    </div>
  );
};

export default ChatDetails;
