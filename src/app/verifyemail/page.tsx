"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const verifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }

    useEffect(() => {
      setError(false);
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken || "");
    }, []);

    useEffect(() => {
      setError(false);
      if (token.length > 0) {
        verifyUserEmail();
      }
    }, [token]);
  };

  return (
    <div
      className="py-2 flex flex-col items-center justify-center 
  min-h-screen"
    >
      <h1 className="text-3xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black mt-4">
        {token ? `${token}` : "No Token found!"}
      </h2>
      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
    </div>
  );
};

export default verifyEmail;
