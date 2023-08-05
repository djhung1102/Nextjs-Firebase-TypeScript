"use client";

import AddNewComment from "@/components/form/AddNewComment";
import { db } from "@/firebaseConfig/firebaseConfig";
import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BlogDetail = () => {
  const params = useParams();
  const postId = params.id as string;

  const [post, setPost] = useState<any>();
  const [comments, setComments] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      if (!postId) return;
      const docRef = doc(db, "posts", postId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        setPost(docSnapshot.data());
      }
    };
    fetchData();
  }, [postId]);

  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, "posts", postId, "comments");
      const queryPosts = query(colRef);

      onSnapshot(queryPosts, (snapshot) => {
        const results: any[] = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setComments(results);
      });
    };
    fetchData();
  }, [postId]);

  return (
    <div className="mt-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-x-8">
          <Image
            src={post?.image}
            alt=""
            width={400}
            height={200}
            className="object-cover rounded-3xl w-[]"
          />
          <div>
            <h1 className="mb-3 text-xl font-bold">{post?.title}</h1>
            <h3 className="">{post?.author}</h3>
          </div>
        </div>
        <div className="mt-8">
          <h1 className="mb-3 text-lg font-bold">Bình luận</h1>
          <AddNewComment postId={postId} />
          <ul className="list-disc">
            {comments?.map((item: { id: string; comment: string }) => (
              <li key={item.id} className="mt-3">
                {item.comment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
