"use client";
import { auth } from "@/firebase";
import { closeSignUp } from "@/redux/slices/signUpSlice";
import { signInUser } from "@/redux/slices/userSlice";
import { EyeIcon, EyeOffIcon, XIcon } from "@heroicons/react/outline";
import { Box, Input, Modal, Typography } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SignUpModal() {
  const open = useSelector((state) => state.signUp.open);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  function signUp(event) {
    // Capitalise each word in the string
    const capitalisedName = name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ");
    // Set to lowercase and join all words togetherin the string
    const lowercaseUsername = name.toLowerCase().replaceAll(" ", "");
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: capitalisedName,
        });
        dispatch(
          signInUser({
            name: capitalisedName,
            email: email,
            username: lowercaseUsername,
            uid: userCredential.user.uid,
          })
        );
        dispatch(closeSignUp());
      })
      .catch((error) => alert(error.message));
  }

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white 
     sm:rounded-xl h-full sm:h-fit w-full sm:w-[600px] max-w-full outline-none"
      >
        <XIcon
          className="w-7 mt-5 ms-5 cursor-pointer"
          onClick={() => dispatch(closeSignUp())}
        />
        <form
          className="pt-20 pb-10 px-4 sm:px-20 flex flex-col"
          onSubmit={(event) => signUp(event)}
        >
          <h6 className="text-3xl font-bold mb-10">Create your account</h6>
          <div className="space-y-5 w-full mb-20">
            <input
              className="h-[54px] w-full border border-gray-200 outline-none ps-3 
              rounded-[4px] focus:border-[#F4AF01] transition duration-100 ease-in"
              type="text"
              onChange={(event) => setName(event.target.value)}
              value={name}
              placeholder="Name"
            />
            <input
              className="h-[54px] w-full border border-gray-200 outline-none ps-3 
              rounded-[4px] focus:border-[#F4AF01] transition duration-100 ease-in"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              placeholder="Email"
            />
            <div
              className="h-[54px] w-full border border-gray-200 outline-none
              rounded-[4px] focus-within:border-[#F4AF01] transition duration-100 ease-in flex
              items-center pe-3"
            >
              <input
                className="h-full w-full outline-none ps-3"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
              <div
                className="w-7 h-7 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </div>
            </div>
          </div>
          <button className="bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md hover:shadow-lg transition duration-200 ease-in">
            Sign Up
          </button>
        </form>
      </Box>
    </Modal>
  );
}
