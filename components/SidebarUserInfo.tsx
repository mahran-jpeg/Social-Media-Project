"use client";
import { auth } from "@/firebase";
import { closeLogInModal, closeSignUpModal } from "@/redux/slices/modalSlice";
import { signOutUser } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { signOut } from "firebase/auth";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
const SidebarUserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state:RootState)=>state.user)
  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser())
    dispatch(closeSignUpModal())
    dispatch(closeLogInModal())

  }
  return (
    <>
      <div
        className="absolute bottom-6 flex items-center justify-start
          space-x-2 xl:p-3 xl:pe-6 hover:bg-gray-500 hover:bg-opacity-10 
          rounded-full transition cursor-pointer w-fit xl:w-[240px]
          "
          onClick={()=>handleSignOut()}
      >
        <Image
          src={"/assets/profile-pic.png"}
          width={36}
          height={36}
          alt="Profile picture"
          className="w-9 h-9"
        />
        <div className="hidden xl:flex flex-col text-sm max-w-40">
          <span className="whitespace-nowrap text-ellipsis font-bold">{user.name}</span>
          <span className=" whitespace-nowrap text-ellipsis   text-gray-500">@{user.username}</span>
        </div>
      </div>
    </>
  );
};

export default SidebarUserInfo;
