"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const profilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("");

  const getUserDetails = async () => {
    const response = await axios.post("/api/users/profile");
    console.log("Profile data:", response.data.data._id);
    setData(response.data.data._id);
  };

  const logout = () => {
    try {
      const res = axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Error occurred!");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center py-2 
  min-h-screen "
    >
      <h1 className="text-3xl">Profile page</h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "No data found!"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={getUserDetails}
        className="bg-green-500 mt-4 hover:bg-green-700 text-white 
        font-bold py-2 px-4 rounded"
      >
        Get Details
      </button>
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white 
        font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default profilePage;
