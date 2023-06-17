"use client";

import { useDispatch, useSelector } from "react-redux";
import { openSignUp } from "@/redux/slices/signUpSlice";
import { openLogIn } from "@/redux/slices/logInSlice";

export default function signUpPrompt() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.user.name)

  return (
      <div className={`fixed z-50 bottom-0 left-0 right-0 h-[80px] bg-[#F4AF01] ${loggedIn ? 'hidden' : 'flex'} justify-center lg:justify-between items-center lg:px-20 xl:px-40 2xl:px-80`}>
      <div className="hidden md:flex flex-col text-white me-5">
        <span className="text-xl font-bold">Don't miss out on the buzz</span>
        <span>
          People on Busy Bee are always the first to know.
        </span>
      </div>
      <div className="w-full md:w-fit flex p-3">
        <button
          className="font-bold w-full md:w-[88px] h-[48px] md:h-[40px] md:text-sm border border-2 border-gray-100 rounded-full text-white
           hover:bg-white hover:bg-opacity-25 transition duration-150 ease-in"
          onClick={() => dispatch(openLogIn())}
        >
          Log in
        </button>
        <button
          className="font-bold ms-4 md:ms-2 w-full md:w-[88px] h-[48px] md:h-[40px] md:text-sm rounded-full bg-white text-black 
        hover:bg-[#fafafa] transition duration-150 ease-in"
          onClick={() => dispatch(openSignUp())}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
