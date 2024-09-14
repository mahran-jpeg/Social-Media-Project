import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { getDoc, doc, DocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/firebase";
import PostFeed from "@/components/PostFeed";
import Sidebar from "@/components/Sidebar";
import SignUpPrompt from "@/components/SignUpPrompt";
import Widgets from "@/components/Widgets";
import { PostHeader } from "@/components/Post";

interface Comment {
  id: string;
  name: string;
  username: string;
  text: string;
}

interface Post {
  name: string;
  username: string;
  text: string;
  likes: number;
  comments: Comment[];
}

const fetchPost = async (id: string): Promise<Post | null> => {
  const postRef = doc(db, 'posts', id);
  const postSnap: DocumentSnapshot<DocumentData> = await getDoc(postRef);
  
  if (postSnap.exists()) {
    const postData = postSnap.data() as Post;
    return postData;
  }
  return null;
};

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;
  const post = await fetchPost(id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="text-[#0F1419] min-h-screen max-w-[1400px] mx-auto flex">
      <Sidebar />
      
      <main className="flex-grow border-x max-w-2xl">
        <header className="sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm border-b">
          <div className="flex items-center py-4 px-3 font-bold text-lg sm:text-xl">
            <Link href="/" className="mr-4">
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <h1>Post</h1>
          </div>
          <Widgets/>
        </header>
        
        <article className="border-b">
          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start space-x-3">
                <Image
                  src="/assets/profile-pic.png"
                  width={44}
                  height={44}
                  alt="Profile Picture"
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <h2 className="font-bold truncate max-w-[140px] sm:max-w-[160px]">
                    {post.name}
                  </h2>
                  <span className="text-[#707E89] truncate max-w-[140px] sm:max-w-[160px] block">
                    {post.username}
                  </span>
                </div>
              </div>
              <button>
                <EllipsisHorizontalIcon className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[15px] mb-3">{post.text}</p>
          </div>
          
          <div className="border-t py-3 px-4">
            <span className="font-bold">{post.likes}</span> Likes
          </div>
          
          <div className="border-t py-3 px-4 flex justify-evenly">
            <ChatBubbleLeftEllipsisIcon className="w-[22px] h-[22px] cursor-not-allowed text-[#707E89]" />
            <HeartIcon className="w-[22px] h-[22px] cursor-not-allowed text-[#707E89]" />
            <ChartBarIcon className="w-[22px] h-[22px] cursor-not-allowed text-[#707E89]" />
            <ArrowUpTrayIcon className="w-[22px] h-[22px] cursor-not-allowed text-[#707E89]" />
          </div>
        </article>
        
        {post.comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </main>
      
      <Widgets />
      <SignUpPrompt />
    </div>
  );
}

function Comment({ name, username, text }: Comment) {
  return (
    <div className="border-b">
      <div className="p-4">
        <PostHeader name={name} username={username} text={text} />
      </div>
      <div className="border-t py-3 px-4 flex justify-start space-x-14 ml-16">
        <ChatBubbleLeftEllipsisIcon className="w-[22px] h-[22px] cursor-not-allowed text-[#707E89]" />
        <HeartIcon className="w-[22px] h-[22px] cursor-not-allowed text-[#707E89]" />
        <ChartBarIcon className="w-[22px] h-[22px] cursor-not-allowed text-[#707E89]" />
        <ArrowUpTrayIcon className="w-[22px] h-[22px] cursor-not-allowed text-[#707E89]" />
      </div>
    </div>
  );
}