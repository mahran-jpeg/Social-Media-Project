"use client";
import { db } from "@/firebase";
import { openCommentModal, openLogInModal, setCommentDetails } from "@/redux/slices/modalSlice";
import { RootState } from "@/redux/store";
import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { arrayRemove, arrayUnion, doc, DocumentData, Timestamp, updateDoc } from "firebase/firestore";
import { HeartIcon as HeartSolidIcon} from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
interface PostProps {
  data: DocumentData;
  id: string;
}


const Post = ({ data, id }: PostProps) => {
  async function likePost(){

    if(!user.username){
      dispatch(openLogInModal())
      return
    }
    const postRef = doc(db,'post',id)

    if(data.likes.includes(user.uid)){
      await updateDoc(postRef,{
        likes:arrayRemove(user.uid)
      })
    }else{
      await updateDoc(postRef,{
        likes:arrayUnion(user.uid)
      })
      
    }
    
   
    }
  const dispatch = useDispatch();
  const user = useSelector((state:RootState)=>state.user)
  return (
    <div>
      <Link href={'/' + id}>
        <PostHeader
          username={data.username}
          name={data.name}
          timestamp={data.timestamp}
          text={data.text}
        />
      </Link>
      <div className="ml-16 p-3 flex space-x-14">
        <div className="relative ">
          <ChatBubbleLeftEllipsisIcon
            className="w-[22px] h-[22px] cursor-pointer
          hover:text-[#F4AF01] transition
          "
            onClick={() => {
              if(!user.username){
                dispatch(openLogInModal())
                return
              }
              dispatch(
                setCommentDetails({
                  name: data.name,
                  username: data.username,
                  id: id,
                  text: data.text,
                })
              );
              dispatch(openCommentModal());
            }}
          />{
            data.comments.length>0 && 
            <span className="absolute text-xs top-1 -right-3">{data.comments.length}</span>
          }
         
        </div>
        <div className="relative">
          {
            data.likes.includes(user.uid)
            ?
     <HeartSolidIcon
     className="w-[22px] h-[22px] cursor-not-allowed
  text-pink-500 transition
   "
   onClick={()=>likePost()}
  
   />  : <HeartIcon className="w-[22px] h-[22px] cursor-not-allowed  hover: text-pink-500 transiti"   onClick={()=>likePost()}/>
          }
          <span className="absolute text-xs top-1 -right-3">
          </span>
        </div>
        <div className="relative">
          <ChartBarIcon className="w-[22px] h-[22px] cursor-not-allowed " />
        </div>
        <div className="relative">
          <ArrowUpTrayIcon className="w-[22px] h-[22px] cursor-not-allowed " />
        </div>
      </div>
    </div>
  );
};

interface PostHeaderProps {
  username: string;
  name: string;
  timestamp?:
    | Timestamp
    | Date
    | { seconds: number; nanoseconds: number }
    | null;
  text: string;
  replyTo?: string;
}

export function PostHeader({
  username,
  name,
  timestamp,
  text,
  replyTo,
}: PostHeaderProps) {
  const formatTimestamp = (timestamp: PostHeaderProps["timestamp"]) => {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate();
    } else if (timestamp instanceof Date) {
      return timestamp;
    } else if (timestamp && "seconds" in timestamp) {
      return new Date(timestamp.seconds * 1000);
    }
    return null;
  };

  const formattedTimestamp = formatTimestamp(timestamp);

  return (
    <div className="flex p-3 space-x-5">
      <Image
        src="/assets/profile-pic.png"
        height={44}
        width={44}
        alt="Profile picture"
        className="w-11 h-11 "
      />
      <div className="text-[15px] flex flex-col space-y-1.5">
        <div className="flex space-x-1.5 text-[#707E89]">
          <span className="font-bold text-[#0F1419] inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]">
            {name}
          </span>
          <span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]">
            @{username}
          </span>
          <span>·</span>
          {formattedTimestamp && (
            <>
              <span>·</span>
              <Moment fromNow>{formattedTimestamp}</Moment>
            </>
          )}
        </div>
        <span>{text}</span>
        {replyTo && (
          <span className="text=[15px] text-[#707E89]">
            Replying to <span className="text-[#F4AF01]">@{replyTo}</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default Post;
