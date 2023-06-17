"use client";

import { auth } from "@/firebase";
import { signOutUser } from "@/redux/slices/userSlice";
import {
  HomeIcon,
  HashtagIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  BellIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";

export default function Sidebar() {
  const name = useSelector((state) => state.user.name);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  function logOut() {
    signOut(auth)
      .then(() => {
        dispatch(signOutUser());
      })
      .catch((error) => alert(error.message));
  }

  return (
    <div className="sticky top-0 hidden sm:flex flex-col h-screen xl:ml-20 xl:mr-10 p-3 relative z-40">
      <nav className="relative h-full xl:space-y-1.5 flex flex-col items-center xl:block">
        <div className="xl:p-3 p-1 mb-3 xl:mb-0 flex justify-center items-center xl:justify-start">
          <Image
            src={"/assets/busybee-logo2.png"}
            width={48}
            height={48}
            alt="Busy Bee Logo"
          />
        </div>
        <SidebarLink text={"Home"} Icon={HomeIcon} />
        <SidebarLink text={"Explore"} Icon={HashtagIcon} />
        <SidebarLink text={"Notifications"} Icon={BellIcon} />
        <SidebarLink text={"Messages"} Icon={InboxIcon} />
        <SidebarLink text={"Bookmarks"} Icon={BookmarkIcon} />
        <SidebarLink text={"Profile"} Icon={UserIcon} />
        <SidebarLink text={"More"} Icon={DotsCircleHorizontalIcon} />
        <button
          className="hidden xl:block h-[52px] w-[200px] bg-[#F4AF01] text-white rounded-full py-3 font-medium mt-2 bumble-button 
        shadow-md shadow-black/10 transition duration-200 ease-in"
        >
          Bumble
        </button>
        {name && (
          <>
            <div
              className="dropdown dropdown-right absolute bottom-3 p-3 flex items-center justify-between w-full rounded-full hover:bg-gray-500
            hover:bg-opacity-10 transiton duration-150 ease-in cursor-pointer w-[240px] "
            >
              <div className="flex w-[36px] h-[36px] xl:w-full items-center" tabIndex={0}>
                <Image
                  src={"/assets/profile-pic.png"}
                  width={36}
                  height={36}
                  alt="Profile Picture"
                  className="w-[36px] h-[36px]"
                />
                <div className="hidden xl:flex flex-col text-sm ms-2 max-w-[130px]">
                  <span className="font-bold block whitespace-nowrap text-ellipsis overflow-hidden">
                    {name}
                  </span>
                  <span className="text-gray-500 block whitespace-nowrap text-ellipsis overflow-hidden">
                    @{username}
                  </span>
                </div>
              </div>
              <DotsHorizontalIcon className="w-5 h-5 hidden" />
              <ul
                tabIndex={0}
                className="dropdown-content menu shadow-md bg-base-100 hover:bg-base-200 transition duration-150 ease-in rounded-box p-0 w-[300px] ms-3 right-0 h-[48px]"
              >
                <li className="p-2 h-full max-w-[300px] flex items-center justify-center" onClick={() => logOut()}>
                  <span className="h-fit inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold text-center">
                    Log out @{username}
                  </span>
                </li>
              </ul>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}

function SidebarLink({ text, Icon }) {
  return (
    <li className="sidebar-hover flex mb-3 justify-center items-center text-xl space-x-3 p-1.5">
      <Icon className="h-7" />
      <span className="hidden xl:block">{text}</span>
    </li>
  );
}
