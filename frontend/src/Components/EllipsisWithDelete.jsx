import  { useState } from "react";

const EllipsisWithDelete = ({ onDelete , isRemove, onRemove}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDelete = () => {
    onDelete();
    toggleDropdown();
  };

   const handleRemove = () => {
     onRemove();
     toggleDropdown();
   };

  return (
    <span className="relative inline-block z-40 ml-2" onClick={toggleDropdown}>
      <button className=" cursor-pointer text-xs">
        <i className="fa fa-ellipsis-v fa-xl " aria-hidden="true"></i>
      </button>

      {dropdownVisible && (
        <>
          <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md z-50">
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 "
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          {isRemove && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md z-50">
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 "
                onClick={handleRemove}
              >
                Remove
              </button>
            </div>
          )}
        </>
      )}
    </span>
  );
};

export default EllipsisWithDelete;
