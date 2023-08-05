"use client";

import Field from "@/components/form/Field";
import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import { db } from "@/firebaseConfig/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Image from "next/image";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormInputs = {
  title: string;
  author: string;
  image: string;
  image_name: string;
};

const UpdatePost = () => {
  const router = useRouter();
  const postId = useSearchParams().get("id");

  const [image, setImage] = useState<string>("");

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting },
    reset,
    getValues,
  } = useForm<FormInputs>({
    mode: "onChange",
  });

  const imageUrl = getValues("image");

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    const fetchData = async () => {
      if (!postId) return;
      const docRef = doc(db, "posts", postId);
      const docSnapshot = await getDoc(docRef);
      // console.log(docSnapshot.data());
      if (docSnapshot.data()) {
        reset(docSnapshot.data());
      }
    };
    fetchData();
  }, [postId, reset]);

  const handleSelectImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };

  const handleUploadImage = (file: any) => {
    const storage = getStorage();

    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

  const handleUpdatePost = async (values: any) => {
    if (postId) {
      const docRef = doc(db, "posts", postId);
      await updateDoc(docRef, {
        ...values,
        image,
      });
      void router.push("/dashboard");
    }
  };

  const handleDeleteImage = () => {
    const storage = getStorage();
    const imageName = getValues("image_name");
    const imageRef = ref(storage, "images/" + imageName);

    deleteObject(imageRef)
      .then(() => {
        setImage("");
        alert("Delete successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="text-3xl font-bold">Update Post</h1>
      <form
        className="flex flex-wrap items-center mt-6 gap-x-5 gap-y-4"
        onSubmit={handleSubmit(handleUpdatePost)}
      >
        <Field>
          <Label htmlFor="title">Title</Label>

          <Input
            name="title"
            type="text"
            placeholder="Enter your title"
            control={control}
            className="p-4 w-[350px] border border-gray-500 rounded-2xl"
          />
        </Field>
        <Field>
          <Label htmlFor="author">Author</Label>
          <Input
            name="author"
            type="text"
            placeholder="Enter your author"
            control={control}
            className="p-4 w-[350px] border border-gray-500 rounded-2xl"
          />
        </Field>
        <Field>
          <Label>Image</Label>
          <label className="flex items-center justify-center border border-dashed w-[350px] min-h-[250px] rounded-lg relative">
            <input type="file" name="image" onChange={handleSelectImage} className="hidden" />
            {!image ? (
              <div className="flex flex-col items-center text-center pointer-events-none">
                <p className="font-semibold">Choose photo</p>
              </div>
            ) : (
              <Image
                src={image}
                alt=""
                width={300}
                height={200}
                className="object-cover w-full h-full"
              />
            )}
          </label>
        </Field>

        <button
          type="submit"
          className="px-6 py-2 rounded-xl text-white bg-black ml-[50%] -translate-x-2/4"
        >
          Update Post
        </button>
      </form>
      {image ? (
        <button
          className="ml-[50%] -translate-x-2/4 mt-3 px-6 py-2 rounded-xl text-white bg-red-500"
          onClick={handleDeleteImage}
        >
          Delete Image
        </button>
      ) : null}
    </div>
  );
};

export default UpdatePost;
