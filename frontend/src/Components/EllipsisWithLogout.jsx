import  { useState } from "react";

const EllipsisWithLogout = ({ onLogOut }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogOut = () => {
    onLogOut();
    toggleDropdown();
  };

  return (
    <div className="relative inline-block">
      <button className=" cursor-pointer text-sm" onClick={toggleDropdown}>
        <i className="fa fa-ellipsis-v fa-xl " aria-hidden="true"></i>
      </button>

      {dropdownVisible && (
        <div className="absolute z-50 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-md">
          <button
            className="block w-full bg-[#f55858] rounded-xl text-left px-4 py-2 text-gray-800 hover:bg-[#ff9e9e]"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default EllipsisWithLogout;
