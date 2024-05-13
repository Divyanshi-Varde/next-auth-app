"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const loginPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    password: "",
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Logged In successfully!");
      console.log("Login Data:", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log(error);
      toast.error("Login failed!");
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold text-3xl">{loading ? "Loading..." : "Login"}</h1>

      <hr />

      <label htmlFor="email" className="mt-4">
        Email
      </label>
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
        onClick={onLogin}
        className="p-2 border border-gray-300 rounder-lg mb-4 
        focus:outline-none focus:border-gray-600 mt-5"
      >
        {buttonDisabled ? "Can't login" : "Login"}
      </button>
      <Link href="/signup">Signup here</Link>
    </div>
  );
};

export default loginPage;
