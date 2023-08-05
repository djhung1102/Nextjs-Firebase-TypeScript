"use client";

import { useAuth } from "@/context/authContext";
import { db } from "@/firebaseConfig/firebaseConfig";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    const colRef = collection(db, "posts");
    const queryPosts = query(colRef);

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
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="mb-4 text-2xl font-bold text-blue-600">Tất cả bài viết</h1>
      <div className="grid grid-cols-3 gap-x-6 gap-y-4">
        {posts?.map((item: { id: string; image: string; title: string; author: string }) => (
          <div key={item.id} className="flex flex-col items-center gap-y-2">
            <Link href={`/blog/${item.id}`}>
              <Image
                src={item.image}
                alt=""
                width={200}
                height={200}
                className="object-cover w-full rounded-2xl h-[218px]"
              />
            </Link>
            <div className="text-sm font-medium text-gray-500">
              <h3>{item.author}</h3>
            </div>
            <h2 className="text-base font-semibold line-clamp-2">{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
