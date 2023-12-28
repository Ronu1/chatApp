export const ImagePreview = ({ imageUrl, onClose }) => {
  return (
    <div
      className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white   bg-opacity-60"
      onClick={onClose}
    >
      <div className="relative w-[80%] h-[80%]">
        <img src={imageUrl} alt="Preview" className="max-h-full mx-auto my-auto" />
        <button
          onClick={onClose}
          className="absolute z-50 top-2 right-2 bg-[red] text-black px-2 py-1 rounded"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};
