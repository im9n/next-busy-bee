"use client";

import { db } from "@/firebase";
import { openComment, setCommentDetails } from "@/redux/slices/commentSlice";
import { openLogIn } from "@/redux/slices/logInSlice";
import {
  ChartBarIcon,
  ChatIcon,
  HeartIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/solid";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";

export default function Bumble({ data, id }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const loggedIn = useSelector((state) => state.user.name);
  const router = useRouter();

  function handleOpenComment() {
    dispatch(
      setCommentDetails({
        username: data?.username,
        name: data?.name,
        text: data?.text,
        uid: id,
      })
    );

    dispatch(openComment());
  }

  async function handleLikes() {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    const postLikes = postSnap.data().likes;

    if (postLikes.some((like) => like.uid === currentUser.uid)) {
      await updateDoc(postRef, {
        likes: postLikes.filter((like) => like.uid !== currentUser.uid),
      });
    } else {
      await updateDoc(postRef, {
        likes: [
          ...postLikes,
          {
            uid: currentUser.uid,
          },
        ],
      });
    }
  }

  return (
    <div className="border-b border-gray-100">
      <Link href={`/${id}`}>
        <BumbleHeader
          username={data?.username}
          name={data?.name}
          timestamp={data?.timestamp?.toDate()}
          text={data?.text}
        />
      </Link>
      <div className="flex space-x-14 p-3 ms-16">
        <div className="relative">
          <ChatIcon
            onClick={() =>
              !loggedIn ? dispatch(openLogIn()) : handleOpenComment()
            }
            className="h-[22px] w-[22px] text-[#0F1419] cursor-pointer hover:text-[#F4AF01] transition duration-100 ease-in"
          />
          {data.comments.length > 0 && (
            <span className="absolute text-xs top-1 -right-3">
              {data.comments.length}
            </span>
          )}
        </div>
        <div className="relative">
          {data.likes.some((like) => like.uid === currentUser.uid) ? (
            <HeartSolidIcon
              onClick={() => handleLikes()}
              className="h-[22px] w-[22px] text-pink-500 cursor-pointer"
            />
          ) : (
            <HeartIcon
              onClick={() =>
                !loggedIn ? dispatch(openLogIn()) : handleLikes()
              }
              className="h-[22px] w-[22px] text-[#0F1419] cursor-pointer hover:text-pink-500 transition duration-100 ease-in"
            />
          )}
          {data.likes.length > 0 && (
            <span className="absolute text-xs top-1 -right-3">
              {data.likes.length}
            </span>
          )}
        </div>
        <ChartBarIcon className="h-[22px] w-[22px] text-[#0F1419] cursor-not-allowed" />
        <UploadIcon className="h-[22px] w-[22px] text-[#0F1419] cursor-not-allowed" />
      </div>
    </div>
  );
}

export function BumbleHeader({ username, name, timestamp, text, replyTo }) {
  return (
    <div className="flex space-x-5 p-3 relative z-10">
      <img
        src="/assets/profile-pic.png"
        className="w-11 h-11 rounded-full object-cover bg-white"
      />
      <div className="flex flex-col">
        <div className="space-x-1.5 text-[15px] text-[#707E89] mb-1.5 flex items-center">
          <span className="font-bold text-[#0F1419] inline-block max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px] overflow-hidden whitespace-nowrap text-ellipsis">
            {name}
          </span>
          <span className="inline-block max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px] overflow-hidden whitespace-nowrap text-ellipsis">
            @{username}
          </span>

          {timestamp && (
            <>
              <span>·</span>
              <Moment fromNow className="whitespace-nowrap">
                {timestamp}
              </Moment>
            </>
          )}
        </div>
        <span className="ms-0 text-[15px] mb-1.5">{text}</span>
        {replyTo && (
          <span className="text-[15px] text-[#707E89] ">
            Replying to <span className="text-[#F4AF01]">@{replyTo}</span>
          </span>
        )}
      </div>
    </div>
  );
}
