"use client";
import { useEffect, useState } from "react";
import Bumble from "./Bumble";
import BumbleInput from "./BumbleInput";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useDispatch } from "react-redux";
import { closeLoadingScreen } from "@/redux/slices/loadingSlice";
import { render } from "react-dom";

export default function PostFeed() {
  const [bumbles, setBumbles] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function renderPosts() {
      const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
      const unsubscribe = await onSnapshot(q, (snapshot) => {
        setBumbles(snapshot.docs);
      });

      setTimeout(() => {
        dispatch(closeLoadingScreen());
      }, 700);

      return unsubscribe;
    }

    renderPosts();
  }, []);

  return (
    <div className="max-w-2xl flex-grow border-gray-100 border-x">
      <div className="px-3 py-4 text-lg sm:text-xl font-bold
       border-b border-gray-100 sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm transition duration-75">
        Home
      </div>
      <BumbleInput />

      {bumbles.map((bumble) => (
        <Bumble key={bumble.id} data={bumble.data()} id={bumble.id} />
      ))}
    </div>
  );
}
