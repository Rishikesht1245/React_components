import "./App.css";
import { useToggle } from "./hooks/useToggle";
import { useDirection } from "./hooks/useDirection";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const { toggle, handleToggle } = useToggle();
  const { direction, checkDirection } = useDirection();
  const { setItem, getItem } = useLocalStorage();
  const [show, setShow] = useState("");

  useEffect(() => {
    checkDirection();
  }, []);

  const handleSave = () => {
    setItem("name", input);
  };

  const handleShow = () => {
    const value = getItem("name");
    setShow(value);
  };

  return (
    <>
      <div className={`${toggle && "black"} container`}>
        <button className={`btn`} onClick={handleToggle}>
          {toggle ? "On" : "Off"}
        </button>

        <p className={`${toggle && "black"} para`}>
          {`The Direction of HTML Element is ${direction}`}
        </p>

        <div>
          <input
            type="text"
            className="input"
            placeholder="Enter your name"
            onChange={(event) => setInput(event.target.value)}
          />
          <div>
            <button className="btn" onClick={handleSave}>
              Save
            </button>
            <button className="btn" onClick={handleShow}>
              Show
            </button>
            {show && (
              <p className={`${toggle && "black"} para`}>
                The entered Name is {show}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
