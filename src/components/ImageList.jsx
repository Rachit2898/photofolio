import { useEffect, useState } from "react";
import ImageForm from "./ImageForm";
import Image from "./Image";
import { db } from "../../firebaseInit";
import { doc, updateDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ImageList(props) {
  const { openAlbum, setOpenAlbum } = props;
  const [showImageForm, setShowImageForm] = useState(false);
  const [updateImage, setUpdateImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "album", openAlbum.albumId), (doc) => {
      const data = doc.data().imageList;
      setImageList(data);
    });
  }, []);

  async function handleImageDelete(image) {
    const albumRef = doc(db, "album", openAlbum.albumId);
    await updateDoc(albumRef, {
      imageList: arrayRemove(image),
    });
    toast.success("Image Successfully Deleted from your Album!");
  }

  function handleImageEdit(image) {
    setUpdateImage(image);
    setShowImageForm(true);
  }

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };
  function handleBackClick(e) {
    e.preventDefault();
    setOpenAlbum({ albumId: "", show: false });
  }
  return (
    <>
      <ToastContainer />
      <div className="flex justify-between items-center mb-4 mt-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleBackClick}
        >
          Back
        </button>
        <input
          type="text"
          placeholder="Search Image..."
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-400 rounded py-2 px-4 w-full mx-5"
        />
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-40 rounded"
          onClick={() => setShowImageForm(!showImageForm)}
        >
          {!showImageForm ? "Add Image" : "Cancel"}
        </button>
      </div>

      <div style={{ textAlign: "center" }}>
        {showImageForm && (
          <ImageForm
            albumId={openAlbum.albumId}
            updateImage={updateImage}
            setUpdateImage={setShowImageForm}
            setShowImageForm={setShowImageForm}
          />
        )}
        <h1 className="text-2xl font-bold text-white">
          {imageList.length !== 0
            ? "Your Collection"
            : "No Images in Your Collection"}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {imageList
          .filter((image) => {
            return search.toLocaleLowerCase() === ""
              ? image
              : image.name.toLocaleLowerCase().includes(search);
          })
          .map((image, i) => (
            <Image
              image={image}
              key={i}
              index={i}
              handleImageEdit={handleImageEdit}
              handleImageDelete={handleImageDelete}
              openLightbox={openLightbox}
            />
          ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90 ">
          <div className="relative max-w-3xl mx-auto">
            <button
              className="absolute top-4 right-4  hover:text-gray-300 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none"
              onClick={closeLightbox}
            >
              X
            </button>
            <img
              className="w-full max-h-screen border-2  border-white rounded"
              src={imageList[currentImageIndex].link}
              alt={`Image ${currentImageIndex}`}
            />
          </div>
        </div>
      )}
    </>
  );
}
