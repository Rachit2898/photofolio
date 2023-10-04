function Image(props) {
  const url =
    "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60";

  var { info, setOpenAlbum } = props;
  function handleClick() {
    setOpenAlbum({ albumId: info.id, open: true });
  }
  return (
    <div className=" border-white rounded text-[#242424] mt-5">
      <div
        key={info.id}
        className="h-full md:h-[250px] md:w-[400px] bg-[#EAECEC] rounded"
        onClick={handleClick}
      >
        <img
          src={url}
          alt={info.title}
          className="h-[200px] w-full object-cover p-2"
        />
        <div className="p-4">
          <h1 className="text-lg font-semibold">{info.Albumname}</h1>
          <p>{info.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Image;
