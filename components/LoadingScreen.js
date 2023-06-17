"use client";

import { LinearProgress } from "@mui/material";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function LoadingScreen() {
  const loading = useSelector((state) => state.loading.loading);

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 ${
        loading ? "z-50" : "-z-50"
      } bg-white flex 
    items-center justify-center duration-300 ${
      !loading && "animate-out fade-out fill-mode-forwards"
    }`}
    >
      <div className="flex flex-col items-center">
        <Image
          className="mb-5"
          src={"/assets/busybee-logo2.png"}
          alt="Busy Bee Logo"
          width={120}
          height={120}
        />
        <p className="font-bold text-6xl mb-10">
          Busy <span className="text-[#F4AFA1]">Bee</span>
        </p>
        <LinearProgress
          sx={{
            width: 265,
            height: 10,
            backgroundColor: "#F4AFA1",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "black",
            },
          }}
        />
      </div>
    </div>
  );
}
