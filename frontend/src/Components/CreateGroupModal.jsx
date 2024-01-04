import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useOutsideClick from "../CustomHooks/useOutsideClick";

const CreateGroupModal = ({
  handleUserSelect,
  handleUserSearch,
  handleCreateGroup,
  closeModal,
  groupName,
  setGroupName,
  userSearch,
  setUserSearch,
  removeUserSelect,
  addMemberModal,
}) => {
   
  const addUserInChat = useSelector((state) => state.user.addUserInChat);
  const [user, setUser] = useState([]);

  const handleSelect = (data) => {
    if (user.indexOf(data) === -1) {
      setUser((temp) => [...temp, data]);
    }
  };

  const removeSelect = (tag) => {
    setUser(user.filter((sel) => sel._id !== tag._id));
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-[1000]" >
        <div className="relative bg-white p-8 rounded-lg w-96" >
          <span
            className="absolute top-2 right-2 text-2xl cursor-pointer"
            onClick={closeModal}
          >
            &times;
          </span>
          <h2 className="text-2xl font-bold mb-4">
            {addMemberModal === true ? "Add Member" : "Create Group"}
          </h2>
          <div className="mb-4">
            <label
              htmlFor="groupName"
              className="block text-sm font-medium text-gray-700"
            >
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              name="groupName"
              className="mt-1 p-2 w-full border rounded-md"
              value={groupName}
              onChange={(e) => {
                if (addMemberModal !== true) {
                  setGroupName(e.target.value);
                }
              }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="userSearch"
              className="block text-sm font-medium text-gray-700"
            >
              Search Users
            </label>
            <input
              type="text"
              id="userSearch"
              name="userSearch"
              className="mt-1 p-2 w-full border rounded-md"
              value={userSearch}
              onChange={(e) => {
                setUserSearch(e.target.value);
                handleUserSearch(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-3 ">
            {user.length > 0
              ? user.map((tag) => {
                  return (
                    <div key={tag._id} className="border">
                      <button className=" text-black p-[1px]  text-xs ">
                        {tag.name}

                        <i
                          id={tag.uid}
                          className="fa-solid fa-xmark p-[2px] hover:bg-slate-500 hover:text-white"
                          onClick={(e) => {
                            removeUserSelect(tag);
                            removeSelect(tag);
                          }}
                        ></i>
                      </button>
                    </div>
                  );
                })
              : ""}
          </div>
          {Array.isArray(addUserInChat) ? (
            addUserInChat.map((user) => (
              <div key={user._id}>
                <span className="capitalize">{user.name}</span>
                <button
                  className="p-1"
                  onClick={() => {
                    handleUserSelect(user);
                    handleSelect(user);
                  }}
                >
                  <i className="fa-solid fa-plus fa-lg"></i>
                </button>
              </div>
            ))
          ) : (
            <div>No valid search results</div>
          )}

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-1 py-2 px-4 rounded"
            onClick={() => {
              handleCreateGroup();
              setUser([]);
            }}
          >
            {addMemberModal === true ? "Add Member" : "Create Group"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateGroupModal;
