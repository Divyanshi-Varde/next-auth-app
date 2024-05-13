"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const signupPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("SignUp Data:", response.data);

      toast.success("Signed In successfully!");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error("Sign up failed!");
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold text-3xl">
        {loading ? "Loading..." : "Signup"}
      </h1>

      <hr />

      <label className="mt-4" htmlFor="username">
        Username
      </label>
      <input
        className="p-2 border border-gray-300 rounder-lg mb-4 
        focus:outline-none focus:border-gray-600 text-black"
        id="username"
        placeholder="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        type="text"
      />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounder-lg mb-4 
        focus:outline-none focus:border-gray-600 text-black"
        id="email"
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        type="text"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounder-lg mb-4 
        focus:outline-none focus:border-gray-600 text-black"
        id="password"
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="password"
      />

      <button
        onClick={onSignup}
        className="p-2 border border-gray-300 rounder-lg mb-4 
        focus:outline-none focus:border-gray-600 mt-5"
      >
        {buttonDisabled ? "Can't signup" : "Sign In"}
      </button>
      <Link href="/login">Login here</Link>
    </div>
  );
};

export default signupPage;
