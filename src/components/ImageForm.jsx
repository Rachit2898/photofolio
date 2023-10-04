import { useEffect, useRef } from "react";
import { db } from "../../firebaseInit";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ImageForm(props) {
  const { albumId, updateImage, setUpdateImage, setShowImageForm } = props;

  const imageNameRef = useRef();
  const imageUrlRef = useRef();

  useEffect(() => {
    if (updateImage) {
      imageNameRef.current.value = updateImage.name;
      imageUrlRef.current.value = updateImage.link;
    }
  }, [updateImage]);

  function clearForm() {
    imageNameRef.current.value = "";
    imageUrlRef.current.value = "";
    imageNameRef.current.focus();
  }

  async function handleUpdateSubmit(e) {
    e.preventDefault();

    const oldData = {
      name: updateImage.name,
      link: updateImage.link,
    };

    const newData = {
      name: imageNameRef.current.value,
      link: imageUrlRef.current.value,
    };

    const albumRef = doc(db, "album", albumId);

    await updateDoc(albumRef, {
      imageList: arrayUnion(newData),
    });

    updateDoc(albumRef, {
      imageList: arrayRemove(oldData),
    });

    toast.success("Image Updated!");

    setUpdateImage(null);
    setShowImageForm(false);

    clearForm();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name: imageNameRef.current.value,
      link: imageUrlRef.current.value,
    };

    const albumRef = doc(db, "album", albumId);

    await updateDoc(albumRef, {
      imageList: arrayUnion(data),
    });

    toast.success("New Image Added to Your Album!");

    clearForm();
  }

  return (
    <>
      <ToastContainer />
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Update Image</h1>
        <form onSubmit={updateImage ? handleUpdateSubmit : handleSubmit}>
          <input
            type="text"
            className="block w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter Name"
            ref={imageNameRef}
            required
          />
          <input
            type="text"
            className="block w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter URL"
            ref={imageUrlRef}
            required
          />
          <div className="mt-4 space-x-2">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
            >
              {!updateImage ? "Add" : "Update"}
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700 focus:outline-none"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
