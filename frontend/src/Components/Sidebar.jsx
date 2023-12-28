import ChatNavbar from "./ChatNavbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <div className="flex-1 border-r border-black">
      <ChatNavbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
