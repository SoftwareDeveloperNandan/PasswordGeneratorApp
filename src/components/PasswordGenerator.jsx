import React, { useCallback, useEffect, useRef, useState } from "react";

function PasswordGenerator() {
  const [length, setLength] = useState(8); //Start password with 8 character only when browser refresh or reload.
  const [isNumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const [password, setPassword] = useState("");
  // useRef hook
  const passwordRef = useRef(null);

  // function created
  const generatePassword = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    // checked isNumber box
    if (isNumber) str += "1234567890";
    if (isChar) str += "+-=_)(<>?/:;#@$%^&*!";

    // loop to generate random value
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(char);
    }

    setPassword(password);
  }, [length, isNumber, isChar, setPassword]); //add dependencies

  // Tosave password in clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumber, isChar, generatePassword]);

  return (
    <>
      <div className="w-full max-w-xl h-40 mx-auto shadow-md rounded-lg px-4 m-8 text-black bg-gray-400">
        <h1 className="text-3xl text-center font-bold py-2">
          Password Generator App
        </h1>
        <div className="flex shadow-xl rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            className="outline-none w-full px-4 py-2 font-bold"
            placeholder="Password"
            readOnly
          />

          <button
          className="outline-none bg-blue-700 px-3 py-2 cursor-pointer font-bold hover:bg-black text-white"
          onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        {/* range number and charecter */}
        <div className="text-md flex gap-x-2 font-bold">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              className="cursor-pointer"
              min={6}
              max={100}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="">
              Password Length: <span className="text-white">{length}</span>
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              onChange={() => setIsNumber((prev) => !prev)}
              defaultChecked={isNumber}
            />
            <label>Number</label>
          </div>
          {/* Include Charecter */}
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              onChange={() => setIsChar((prev) => !prev)}
              defaultChecked={isChar}
            />
            <label>Charecter</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordGenerator;
