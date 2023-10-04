export default function Image(props) {
  const { image, index, handleImageEdit, handleImageDelete, openLightbox } =
    props;

  return (
    <>
      <div className="bg-white border rounded-lg shadow-md overflow-hidden">
        <div className="cursor-pointer" onClick={() => openLightbox(index)}>
          <img src={image.link} alt="image" className="w-full h-auto" />
        </div>

        <div className="p-3 flex justify-between items-center">
          <div className="text-lg font-semibold">{image.name}</div>
          <div className="space-x-2">
            <button
              className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
              onClick={() => handleImageEdit(image)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none"
              onClick={() => handleImageDelete(image)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
