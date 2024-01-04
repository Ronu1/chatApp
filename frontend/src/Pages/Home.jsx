import Sidebar from "../Components/Sidebar";
import Chat from "../Components/Chat";

const Home = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#ff8686]">
      <div className="flex border border-black w-[99.5%] h-[99%] bg-[#ddddf7]">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
