import { useAuth } from "@/context/authContext";
import { auth } from "@/firebaseConfig/firebaseConfig";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between w-full p-4 border-b border-black">
      <div className="flex items-center gap-x-4">
        <Link href={"/"}>
          <div className="text-lg font-semibold cursor-pointer">Home</div>
        </Link>
        <Link href={"/dashboard"}>
          <div className="text-lg font-semibold cursor-pointer">Dashboard</div>
        </Link>
        <Link href={"/blogs"}>
          <div className="text-lg font-semibold cursor-pointer">Blogs</div>
        </Link>
        <Link href={"/manage/add-post"}>
          <div className="text-lg font-semibold cursor-pointer">Add</div>
        </Link>
      </div>
      <div className="flex items-center gap-x-4">
        {user ? (
          <>
            <div className="text-lg font-semibold cursor-pointer">{user.displayName}</div>
            <div className="text-lg font-semibold cursor-pointer" onClick={() => signOut(auth)}>
              Sign Out
            </div>
          </>
        ) : (
          <>
            <Link href={"/sign-up"}>
              <div className="text-lg font-semibold cursor-pointer">Sign Up</div>
            </Link>
            <Link href={"/sign-in"}>
              <div className="text-lg font-semibold cursor-pointer">Sign In</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
