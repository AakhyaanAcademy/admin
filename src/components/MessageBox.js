import React from "react";
import { IoClose } from "react-icons/io5";
import { useAdminData } from "../context/AdminProvider";

function MessageBox() {
  const { showMessage, setShowMessage } = useAdminData();

  const onCloseHandler = (e) => {
    e.preventDefault();

    setShowMessage({ status: false, message: "" });
  };
  return (
    <div className="border absolute top-[100%] left-[40%] translate-y-full w-1/3 h-[20em] z-20 opacity-100 flex items-center justify-center bg-blue-700 rounded-[2em]">
      <div
        className="absolute top-5 right-5 cursor-pointer"
        onClick={onCloseHandler}>
        <IoClose size={32} color="white" className="hover:scale-105" />
      </div>
      <div className="text-white text-[1.5rem]">{showMessage.message}</div>
    </div>
  );
}

export default MessageBox;
