"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { closeSignUpModal, openSignUpModal } from "@/redux/slices/modalSlice";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
import { signInUser } from "@/redux/slices/userSlice";
const SignUpModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isOpen = useSelector(
    (state: RootState) => state.modals.signUpModalOpen
  );

  const dispatch: AppDispatch = useDispatch();

  async function handleSignUp() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredentials.user,{
      displayName: name
    })
    dispatch(signInUser({
      name:userCredentials.user.displayName,
      username :userCredentials.user.email!.split('@')[0],
      email : userCredentials.user.email,
      uid : userCredentials.user.uid,
    }))
  }
  async function handleGuestLogIn(){
    await signInWithEmailAndPassword(auth,'Guest5678@gmail.com','12345678')
  }
  const unsubscribe = useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;

      dispatch(
        signInUser({
          name : currentUser.displayName,
          username : currentUser.email!.split('@')[0],
          email : currentUser.email,
          uid : currentUser.uid,
        })
      );
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <button
        className="w-full h-[48px] md:w-[88px] md:h-[40px] text-sm font-bold bg-white rounded-full lg:mt-1"
        onClick={() => {
          dispatch(openSignUpModal());
        }}
      >
        Sign Up
      </button>
      <Modal
        open={isOpen}
        className="flex justify-center items-center outline-none"
        onClose={() => dispatch(closeSignUpModal())}
      >
        <div className="w-full h-full sm:w-[600px] sm:h-fit sm:rounded-xl bg-white">
          <XMarkIcon
            className="w-7 mt-5 ms-5 cursor-pointer"
            onClick={() => dispatch(closeSignUpModal())}
          />
          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-3xl font-bold mb-10">Create your Account</h1>

            <div className="w-full space-y-5 mb-10">
              <input
                type="text"
                className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#F4AF01] transition"
                onChange={(event) => setName(event.target.value)}
                placeholder="Name"
                value={name}
              />
              <input
                type="email"
                className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#F4AF01] transition"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />

              <div className="w-full h-[54px] border border-gray-200 outline-none rounded-[4px] focus-within:border-[#F4AF01] transition flex items-center overflow-hidden">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full h-full ps-3 outline-none "
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-10 h-10 text-gray-400 cursor-pointer pr-3 pt-2"
                >
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </div>
              </div>
            </div>
            <button
              className="bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md mb-5 w-full "
              onClick={() => handleSignUp()}
            >
              Sign Up
            </button>
            <span className="mb-5 text-sm text-center block">Or</span>
            <button className="bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md  w-full" onClick={()=>handleGuestLogIn()}>
              Log In as Guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SignUpModal;
