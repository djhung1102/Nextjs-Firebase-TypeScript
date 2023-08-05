"use client";

import { useAuth } from "@/context/authContext";
import { db } from "@/firebaseConfig/firebaseConfig";
import { collection, deleteDoc, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { user } = useAuth();
  const userUid = user?.uid;

  const router = useRouter();

  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    if (userUid) {
      const colRef = collection(db, "posts");
      const queryPosts = query(colRef, where("userId", "==", userUid));

      onSnapshot(queryPosts, (snapshot) => {
        const results: any[] = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
  }, [userUid]);

  const handleDeletePost = async (postId: string) => {
    const docRef = doc(db, "posts", postId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    });
  };

  if (!userUid) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="mb-6 text-2xl font-bold text-blue-600">Danh sách bài viết</h1>
      {posts?.map((item: { id: string; image: string; title: string; author: string }) => (
        <div
          className="flex flex-row items-center justify-between w-full p-3 mb-8 border border-gray-400 rounded-xl gap-x-3"
          key={item.id}
        >
          <Image
            src={item.image}
            alt=""
            width={120}
            height={81}
            className="object-cover rounded-xl"
          />
          <h2 className="text-base w-[400px] line-clamp-2">{item.title}</h2>
          <h3 className="text-base w-[160px] line-clamp-1">{item.author}</h3>
          <div className="flex items-center gap-x-3">
            <button
              className="px-4 py-2 text-white bg-green-600 rounded-full"
              onClick={() => router.push(`/manage/update-post?id=${item.id}`)}
            >
              Cập nhật
            </button>
            <button
              className="px-4 py-2 text-white bg-red-500 rounded-full"
              onClick={() => handleDeletePost(item.id)}
            >
              Xoá
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
