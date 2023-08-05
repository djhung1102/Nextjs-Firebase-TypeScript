import { db } from "@/firebaseConfig/firebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useRef } from "react";

type Props = {
  postId: string;
};

const AddNewComment = ({ postId }: Props) => {
  const name = useRef();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const colRef = collection(db, `/posts/${postId}/comments`);
    await addDoc(colRef, {
      comment: name.current?.value,
    });

    e.target.reset();
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <input ref={name} className="px-3 py-1 border border-black rounded-lg" />
        <button type="submit" className="px-3 py-1 ml-3 text-white bg-black rounded-lg">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddNewComment;
