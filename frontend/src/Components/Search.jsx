import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accessChat } from "../redux/features/ChatSlice";
import { getUser, removeSearchedUser } from "../redux/features/UserSlice";

const Search = () => {
  const [username, setUsername] = useState("");
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.addUserInChat)[0];

  const handleSearch = async () => {
    try {
      dispatch(getUser(username));
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    dispatch(accessChat(user._id));
    dispatch(removeSearchedUser());
    setUsername("");
  };

  return (
    <div>
      <div className="relative p-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <i
            className="fa-solid fa-magnifying-glass fa-2xs pl-2"
            style={{ color: "#000" }}
          ></i>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-3 pl-10 text-sm text-black border border-opacity-60 border-white rounded-lg bg-[#d0d0ff] hover:border-white hover:transition-all hover:duration-600 focus:transition-all focus:duration-500 focus:border-sky-400 focus:outline-none"
          placeholder="Search for..."
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div
          className=" pl-8 border-b-2 flex items-center p-3 py-[6px] gap-3 hover:bg-slate-100"
          onClick={handleSelect}
        >
          <img className="h-9 w-9 rounded-[50%]" src={user.pic} />
          <div className="">
            <span className="capitalize">{user.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
