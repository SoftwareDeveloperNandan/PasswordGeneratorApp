# PasswordGeneratorApp
The PasswordGenerator React component is a tool that allows users to generate random passwords with customizable length and character options.

# Features
Password Generation: Generates a random password using a combination of uppercase letters, lowercase letters, numbers, and special characters based on user preferences.
Clipboard Functionality: Allows users to easily copy the generated password to the clipboard with a single click.
Responsive UI: Built with Tailwind CSS, ensuring a responsive and visually appealing interface.

# State Management
length: Manages the length of the password, starting with a default value of 8.
isNumber: Toggles the inclusion of numbers in the password.
isChar: Toggles the inclusion of special characters in the password.
password: Stores the generated password.

# References
passwordRef: A reference to the password input field, used for copying the password to the clipboard.

# Functions
generatePassword: Generates a random password based on the selected length and character options.
copyPasswordToClipboard: Copies the generated password to the clipboard.

# Effects
The useEffect hook ensures that a new password is generated whenever the length, number, or character options change.

# UI Elements

An input field to display the generated password.
A button to copy the password to the clipboard.
A range input to select the password length.
Checkboxes to include numbers and special characters in the password.

# Code React component
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

# App.jsx
import PasswordGenerator from "./components/PasswordGenerator.jsx";

function App() {

  return (
   <>
    <PasswordGenerator />
   </>
  )
}

export default App;

