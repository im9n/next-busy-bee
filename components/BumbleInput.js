"use client";

import { db } from "@/firebase";
import { closeComment } from "@/redux/slices/commentSlice";
import { openLogIn } from "@/redux/slices/logInSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import { Alert, Snackbar } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Router, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BumbleInput({ replyTo }) {
  const [text, setText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const comment = useSelector((state) => state.comment);
  const router = useRouter();
  const dispatch = useDispatch();


  async function postBumble() {
    await addDoc(collection(db, "posts"), {
      name: user.name,
      username: user.username,
      text: text,
      timestamp: serverTimestamp(),
      likes: [],
      comments: [],
    });

    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);
  }

  async function commentBumble() {
    const postRef = doc(db, "posts", comment.uid);
    const postSnap = await getDoc(postRef);
    const postComments = await postSnap.data().comments;

    await updateDoc(postRef, {
      comments: [
        ...postComments,
        {
          name: user.name,
          username: user.username,
          text: text,
          likes: [],
        },
      ],
    });

    dispatch(closeComment());

    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);
  }

  function handleSnackbarClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  }

  return (
    <div className="flex space-x-5 p-3 border-b border-gray-100 relative z-10">
      <img
        className="w-11 h-11 rounded-full object-cover bg-white"
        src={replyTo ? "/assets/profile-pic.png" : "/assets/busybee-logo2.png"}
        alt="Busy Bee Logo"
      />
      <div className="w-full">
        <textarea
          className="bg-transparent resize-none outline-none focus:outline-none active:outline-none border-transparent grow min-h-[50px] w-full text-lg"
          onChange={(event) => setText(event.target.value)}
          value={text}
          placeholder={replyTo ? "Send your reply" : "What's happening!?"}
        />
        <div className="flex justify-between items-center border-t border-gray-100 pt-5">
          <div className="flex space-x-1.5">
            <PhotographIcon className="h-[22px] cursor-pointer text-[#F4AF01]" />
            <ChartBarIcon className="h-[22px] cursor-pointer text-[#F4AF01]" />
            <EmojiHappyIcon className="h-[22px] cursor-pointer text-[#F4AF01]" />
            <CalendarIcon className="h-[22px] cursor-pointer text-[#F4AF01]" />
            <LocationMarkerIcon className="h-[22px] cursor-pointer text-[#F4AF01]" />
          </div>
          <button
            className={`bg-[#F4AF01] text-white w-[80px] h-[36px] rounded-full text-sm cursor-pointer ${
              !text && "bg-opacity-60"
            }`}
            onClick={() => {
              user.name
                ? text && (replyTo ? commentBumble() : postBumble())
                : dispatch(openLogIn());
            }}
          >
            Bumble
          </button>
        </div>
      </div>
      <Snackbar
        className=""
        open={snackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          color: "white",
          zIndex: "99",
          "& .MuiPaper-root": {
            backgroundColor: "#F4AF01",
          },
        }}
        autoHideDuration={3000}
        message="Bumble Sent!"
      >
        <Alert
          severity="success"
          onClose={handleSnackbarClose}
          sx={{
            width: 300,
            color: "white",
            fontSize: "15px",
            fontWeight: "bold",
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        >
          Bumble Sent!
        </Alert>
      </Snackbar>
    </div>
  );
}
