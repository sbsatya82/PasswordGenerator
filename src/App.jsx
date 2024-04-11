import { useState, useCallback, useEffect, useRef } from "react";
import './App.css'
function App() {
  let [length, setLength] = useState(8);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");
  const [showCopyMessage, setShowCopyMessage] = useState(false); // State to manage copy message visibility
  //password generator function
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  //useRef hook

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    if (password) {
      passwordRef.current?.select();
      navigator.clipboard
        .writeText(password)
        .then(() => {
          setShowCopyMessage(true); // Show copy message on successful copy
          setTimeout(() => {
            setShowCopyMessage(false); // Hide message after 2 seconds
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy password: ", err);
        });
    }
  }, [password]);

  //use effect hook
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center font-bold my-3">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-1"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex text-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="lengthInput">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="charInput"
              checked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
        {showCopyMessage && (
          <div className="message-container visible">
            <p className="text-green-500 text-center">
              Password copied to clipboard!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
