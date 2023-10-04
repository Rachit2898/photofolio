import React, { useState, useRef, useEffect } from "react";
import Image from "./ImageSection";
import { db } from "../../firebaseInit";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import ImageList from "./ImageList";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [isCreatingAlbum, setIsCreatingAlbum] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const [openAlbum, setOpenAlbum] = useState({ albumId: "", open: false });
  const nameRef = useRef();
  const [albumList, setAlbumList] = useState([]);

  const handleCreateAlbumClick = () => {
    setIsCreatingAlbum(true);
  };

  const clearForm = () => {
    nameRef.current.value = "";
    nameRef.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "album"), {
      Albumname: nameRef.current.value,
      imageList: [],
    });
    console.log(docRef);
    toast.success("New Album added!");
    clearForm();
  };

  const handleAdd = (e) => {
    e.preventDefault();
    handleSubmit(e);
    setIsCreatingAlbum(false);
    setAlbumName("");
  };
  const handleCancelClick = () => {
    setIsCreatingAlbum(false);
    setAlbumName("");
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "album"), (snapShot) => {
      const card = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(card);

      setAlbumList(card);
    });
  }, []);

  return (
    <div>
      {!openAlbum.open ? (
        <>
          <div className="flex flex-row justify-end mb-5 rounded text-white ">
            <div className="bg-red-700 p-2 text-white rounded  hover:bg-red-900">
              <button onClick={handleCreateAlbumClick}>Create Album</button>
            </div>
          </div>

          {isCreatingAlbum && (
            <div className="bg-gray-200 p-4 rounded-md ">
              <input
                type="text"
                placeholder="Album Name"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                ref={nameRef}
                className="block w-full border-gray-300 rounded-md py-2 px-3 mb-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              <div className="space-x-2">
                <button
                  onClick={handleAdd}
                  className=" bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Add
                </button>
                <button
                  onClick={handleCancelClick}
                  className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-white rounded text-[#242424] mt-5">
            {albumList.map((card, i) => (
              <Image key={i} info={card} setOpenAlbum={setOpenAlbum} />
            ))}
          </div>
        </>
      ) : (
        <ImageList openAlbum={openAlbum} setOpenAlbum={setOpenAlbum} />
      )}

      <ToastContainer />
    </div>
  );
}

export default Home;
