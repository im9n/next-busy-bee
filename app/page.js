import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import PostFeed from "@/components/Postfeed";
import Trending from "@/components/Trending";
import SignUpPrompt from "@/components/SignUpPrompt";
import SignUpModal from "@/components/modals/SignUpModal";
import LogInModal from "@/components/modals/LogInModal";
import CommentModal from "@/components/modals/CommentModal";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <>
      <div className="bg-white min-h-screen text-[#0F1419] max-w-[1400px] mx-auto flex md:justify-center">
        <Sidebar />
        <PostFeed />
        <Trending />
        <SignUpPrompt />
        <SignUpModal />
        <LogInModal />
        <CommentModal />
      </div>
      <LoadingScreen />
    </>
  );
}
