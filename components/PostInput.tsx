import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { db } from '@/firebase';
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { CalendarIcon, ChartBarIcon, FaceSmileIcon, MapPinIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { closeCommentModal } from '@/redux/slices/modalSlice';

interface PostInputProps {
  addPostLocally: (post: any) => void;
  insideModal?:boolean
}

const PostInput: React.FC<PostInputProps> = ({ addPostLocally,insideModal }:PostInputProps) => {
  const commentDetails= useSelector((state:RootState)=>state.modals.commenPostDetails)
  const [text, setText] = useState('');
  const user = useSelector((state: RootState) => state.user);
const dispatch = useDispatch()
  async function sendPost() {
    const newPost = {
      text: text,
      name: user.name,
      username: user.username,
      timestamp: serverTimestamp(),
      likes: [],
      comments: []
    };

  
    const docRef = await addDoc(collection(db, 'posts'), newPost);
    
 
    addPostLocally({ ...newPost, id: docRef.id });
    
    setText('');
    dispatch(closeCommentModal())
  }
async function sendComment() {
  const postRef = doc(db,'posts',commentDetails.id)
  await updateDoc(postRef,{
    comments:arrayUnion({
      name:user.name,
      username:user.username,
      text:text
    })
  })
  setText('')
}
  return (
    <div className='flex space-x-5 p-3'>
      <Image
        src={insideModal ? '/assets/profile-pic.png':'/assets/busybee-logo2.png'}
        width={44}
        height={44}
        alt={insideModal?'PFP':'Logo'}
        className='w-11 h-11 z-10'
      />
      <div className='w-full'>
        <textarea
          className='resize-none outline-none w-full min-h-[50px] text-lg'
          placeholder={insideModal?"Send your reply":`What's happening`}
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <div className='flex justify-between pt-5'>
          <div className='flex space-x-1.5'>
            <PhotoIcon className='w-[22px] h-[22-px] text-[#F4AF01]'/>
            <ChartBarIcon className='w-[22px] h-[22-px] text-[#F4AF01]'/>
            <FaceSmileIcon className='w-[22px] h-[22-px] text-[#F4AF01]'/>
            <CalendarIcon className='w-[22px] h-[22-px] text-[#F4AF01]'/>
            <MapPinIcon className='w-[22px] h-[22-px] text-[#F4AF01]'/>
          </div>
          <button
            className='bg-[#F4AF01] text-white w-[80px] h-[36px] rounded-full text-sm cursor-pointer disabled:bg-opacity-60'
            onClick={()=> insideModal? sendComment():sendPost()}
            disabled={!text}
          >
            Bumble
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostInput;