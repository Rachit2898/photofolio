import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="md:mx-10 md:p-4">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
