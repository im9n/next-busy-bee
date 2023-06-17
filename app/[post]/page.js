import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import LogInModal from "@/components/modals/LogInModal";
import SignUpModal from "@/components/modals/SignUpModal";
import SignUpPrompt from "@/components/SignUpPrompt";
import {
  ArrowLeftIcon,
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { BumbleHeader } from "@/components/Bumble";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import CommentModal from "@/components/modals/CommentModal";
import { usePathname, useRouter } from "next/navigation";

async function handleData(post) {
  const postRef = doc(db, "posts", post);
  const postSnap = await getDoc(postRef);
  const postData = await postSnap.data();

  return postData;
}

export default async function Post({ params }) {
  const postData = await handleData(params.post);

  return (
    <div className="bg-white min-h-screen text-[#0F1419] max-w-[1400px] mx-auto flex md:justify-center">
      <Sidebar />
      <div className="max-w-2xl flex-grow border-gray-100 border-x">
        <div className="flex items-center px-3 py-4 text-lg sm:text-xl font-bold border-b border-gray-100 sticky top-0 z-50 bg-white">
          <Link href="/">
            <ArrowLeftIcon className="h-5 w-5 me-10" />
          </Link>
          <span>Bumble</span>
        </div>
        <div className="flex flex-col p-3 relative z-10 space-y-5 border-b border-gray-100">
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex space-x-3 ">
              <img
                src="/assets/profile-pic.png"
                className="w-11 h-11 rounded-full object-cover bg-white"
              />
              <div className="flex flex-col">
                <div className="text-[15px] text-[#707E89] flex flex-col ">
                  <span className="font-bold text-[#0F1419] inline-block max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {postData?.name}
                  </span>
                  <span className="inline-block max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px] overflow-hidden whitespace-nowrap text-ellipsis">
                    @{postData?.username}
                  </span>
                </div>
              </div>
            </div>
            <DotsHorizontalIcon className="w-5 h-5" />
          </div>
          <span className="ms-0 text-[15px] mb-1.5">{postData?.text}</span>
        </div>
        {/* <div className="border-b border-gray-100 p-3 text-[15px]">
          <span>
            <span className="font-bold">{postData?.likes.length}</span> Likes
          </span>
        </div> */}
        <div className="border-b border-gray-100 p-3 py-3 text-[15px] flex justify-evenly">
          <ChatIcon className="h-[22px] w-[22px] text-[#707E89] cursor-not-allowed" />
          <HeartIcon className="h-[24px] w-[24px] text-[#707E89] cursor-not-allowed" />
          <ChartBarIcon className="h-[24px] w-[24px] text-[#707E89] cursor-not-allowed" />
          <UploadIcon className="h-[24px] w-[24px] text-[#707E89] cursor-not-allowed" />
        </div>
        <div className="flex flex-col">
          {postData?.comments?.map((comment) => (
            <BumbleComment
              name={comment.name}
              username={comment.username}
              text={comment.text}
              likes={comment.likes}
            />
          ))}
        </div>
      </div>
      <Trending />
      <SignUpPrompt />
      <SignUpModal />
      <LogInModal />
      <CommentModal />
    </div>
  );
}

function BumbleComment({ name, username, text, likes }) {
  return (
    <div className="border-b border-gray-100">
      <BumbleHeader username={username} name={name} text={text} />
      <div className="flex space-x-14 p-3 ms-16">
        <ChatIcon className="h-[22px] w-[22px] text-[#0F1419] cursor-not-allowed" />
        <HeartIcon className="h-[22px] w-[22px] text-[#0F1419] cursor-not-allowed" />
        <ChartBarIcon className="h-[22px] w-[22px] text-[#0F1419] cursor-not-allowed" />
        <UploadIcon className="h-[22px] w-[22px] text-[#0F1419] cursor-not-allowed" />
      </div>
    </div>
  );
}
