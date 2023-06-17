"use client";
import { EyeIcon, EyeOffIcon, XIcon } from "@heroicons/react/outline";
import { Box, Input, Modal, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { closeLogIn } from "@/redux/slices/logInSlice";
import { useSelector, useDispatch } from "react-redux";
import { auth, signInWithEmailAndPassword } from "@/firebase";
import { signInUser } from "@/redux/slices/userSlice";

export default function LogInModal() {
  const open = useSelector((state) => state.logIn.open);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function logIn(event) {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const name = userCredential.user.displayName;
        const username = name.toLowerCase().replaceAll(" ", "");
        const email = userCredential.user.email;
        const uid = userCredential.user.uid

        dispatch(
          signInUser({
            name: name,
            username: username,
            email: email,
            uid: uid
          })
        );
        dispatch(closeLogIn());
      })
      .catch((error) => {
        alert(error.message);
      });
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
          onClick={() => dispatch(closeLogIn())}
        />
        <form
          className="pt-20 pb-10 px-4 sm:px-20 flex flex-col"
          onSubmit={(event) => logIn(event)}
        >
          <h6 className="text-3xl font-bold mb-10">Log in to Busy Bee</h6>
          <div className="space-y-5 w-full mb-20">
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
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                placeholder="Password"
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
            Log In
          </button>
        </form>
      </Box>
    </Modal>
  );
}
