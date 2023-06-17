"use client";

import { XIcon } from "@heroicons/react/outline";
import { Box, Modal } from "@mui/material";
import { BumbleHeader } from "../Bumble";
import BumbleInput from "../BumbleInput";
import { useDispatch, useSelector } from "react-redux";
import { closeComment } from "@/redux/slices/commentSlice";

export default function CommentModal() {
const commentDetails = useSelector(state => state.comment)
const dispatch = useDispatch()
  
  return (
    <Modal
      open={commentDetails?.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white 
       sm:rounded-xl h-full sm:h-fit w-full sm:w-[600px] max-w-full outline-none"
      >
        <XIcon className="w-7 mt-5 ms-5 cursor-pointer" onClick={() => dispatch(closeComment())}/>
        <div className="pt-5 pb-10 px-0 sm:px-5 flex flex-col">
          <BumbleHeader
            username={commentDetails?.username}
            name={commentDetails?.name}
            text={commentDetails?.text}
            replyTo={commentDetails?.id}
          />
          <div className="mt-4">
          <BumbleInput replyTo={true} />
          </div>
         <div className="absolute w-0.5 h-20 bg-gray-300 left-[33px] sm:left-[53px] top-28 z-0"></div>
        </div>
      </Box>
    </Modal>
  );
}
