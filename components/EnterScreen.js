"use client";
import React from "react";
import { useRouter } from "next/navigation";

const EnterScreen = ({ onEnterClick }) => {
  const router = useRouter();

  const handleEnterClick = () => {
    router.push("/");
    onEnterClick(); // Call the parent component's onEnterClick function
  };

  return (
    <div className="enter-screen">
      <div className="content">
        <h1>Seed&apos;s portfolio :D</h1>
        <button onClick={handleEnterClick}>Enter</button>
      </div>
    </div>
  );
};

export default EnterScreen;
