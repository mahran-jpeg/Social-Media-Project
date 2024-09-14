'use client'
import React, { useEffect, useState } from 'react';
import { collection, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import Post from "./Post";
import PostInput from "./PostInput";

const PostFeed = () => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs);
    });

    return unsubscribe;
  }, []);

  const addPostLocally = (newPost: DocumentData) => {
    setPosts((prevPosts) => [
      {
        id: 'temp-id',
        data: () => newPost,
      } as QueryDocumentSnapshot<DocumentData, DocumentData>,
      ...prevPosts,
    ]);
  };

  return (
    <div className="flex-grow border max-w-2xl">
      <div className="py-4 px-3 text-lg sm:text-xl sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold">
        Home
      </div>
      <PostInput addPostLocally={addPostLocally} />
      {posts.map((post) => (
        <Post key={post.id} data={post.data()} id={post.id} />
      ))}
    </div>
  );
};

export default PostFeed;