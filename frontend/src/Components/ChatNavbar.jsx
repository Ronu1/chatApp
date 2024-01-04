import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import EllipsisWithLogout from "./EllipsisWithLogout";
import CreateGroupModal from "./CreateGroupModal";
import { useDispatch } from "react-redux";
import { getUser, removeSearchedUser } from "../redux/features/UserSlice";
import { v4 as uuidv4 } from "uuid";
import { createGroupChat } from "../redux/features/ChatSlice";

const ChatNavbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // const postDetails = (profilePic) => {
  //   const form = new FormData();
  //   form.append("file", profilePic);
  //   form.append("upload_preset", "chat-app");
  //   form.append("cloud_name", "ronitbrilworks");
  //   fetch("https://api.cloudinary.com/v1_1/ronitbrilworks/image/upload", {
  //     method: "post",
  //     body: form,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setUrl(data.url))
  //     .catch((err) => console.log(err));
  // };

  //  useEffect(() => {
  //    if (profilePic) {
  //      postDetails(profilePic);
  //    }
  //  }, [profilePic]);

  // useEffect(() => {
  //   if (url) {
  //     changeProfilePic(url);
  //   }
  // }, [url]);

  //     const changeProfilePic = async() => {
  // await updateDoc(doc(db, "users", currentUser.uid), {
  //   pic : url
  // });
  //     }

  const handleCreateGroup = async () => {
    dispatch(createGroupChat({users: selectedUsers , name: groupName}))
    dispatch(removeSearchedUser());
    setSelectedUsers([]);
    setModalOpen(false);
  };

  const handleUserSearch = (searchQuery) => {
    dispatch(getUser(searchQuery));
  };

  const removeUserSelect = (tag) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel.uid !== tag.uid));
  };

  const handleUserSelect = (id) => {
    if (selectedUsers.indexOf(id) === -1) {
      setSelectedUsers((temp) => [...temp, id]);
    }
  };
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center h-[60px] w-full bg-[#adadff] z-[1000] m-0 pl-[15px] pr-4 py-2.5">
      <div className="w-max  flex items-center gap-2 cursor-pointer">
        <input
          style={{ display: "none" }}
          type="file"
          id="picFile"
          name="profilePic"
          onChange={(e) => {
            setProfilePic(e.target.files[0]);
          }}
        />
        <label
          htmlFor="picFile"
          className="flex gap-1 items-center justify-center"
        >
          <img className="h-10 w-10 rounded-[50%]" src={currentUser.pic} />
        </label>
        <span className="capitalize">{currentUser.name}</span>
      </div>
      <div className=" flex flex-row items-center gap-4">
        <div className=" text-sm text-black cursor-pointer">
          <button className=" cursor-pointer " onClick={() => openModal()}>
            <i className="fa-solid fa-plus fa-xl"></i>
          </button>
          {isModalOpen && (
            <CreateGroupModal
              closeModal={closeModal}
              handleCreateGroup={handleCreateGroup}
              handleUserSearch={handleUserSearch}
              handleUserSelect={(e) => handleUserSelect(e)}
              groupName={groupName}
              selectedUsers={selectedUsers}
              userSearch={userSearch}
              setGroupName={setGroupName}
              setSelectedUsers={setSelectedUsers}
              setUserSearch={setUserSearch}
              removeUserSelect={(e) => removeUserSelect(e)}
            />
          )}
        </div>
        <EllipsisWithLogout onLogOut={() => logOut()} />
      </div>
    </div>
  );
};

export default ChatNavbar;
