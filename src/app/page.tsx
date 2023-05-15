"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "./globals.css";
import dynamic from "next/dynamic";
import {
  FaDiscord,
  FaSpotify,
  FaStackOverflow,
  FaTwitter,
  FaGithubAlt,
} from "react-icons/fa";
import { BsFillPlayCircleFill, BsFillPauseCircleFill} from "react-icons/bs";
import EnterScreen from "../../components/EnterScreen";

const DynamicSocialIcons = dynamic(
  () => import("../../components/SocialIcons"),
  {
    ssr: false,
  }
);

const BackgroundAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      if (isPlaying) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volumeLevel = parseFloat(event.target.value);
    setVolume(volumeLevel);
  
    if (audioRef.current) {
      audioRef.current.volume = volumeLevel;
    }
  };

  return (
    <div className="background-audio">
      <audio ref={audioRef} autoPlay loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
      <div className="enter-button" onClick={handlePlayPause}>
          {isPlaying ? <BsFillPauseCircleFill/> : <BsFillPlayCircleFill/>}
        </div>
      <div className="audio-controls">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default function Home() {
  const [showEnterScreen, setEnterScreen] = useState(true);

  const handleEnterClick = () => {
    setEnterScreen(false);
    console.log("set");
  };

  return (
    <body>
      <div>
        {showEnterScreen ? (
          <EnterScreen onEnterClick={handleEnterClick} />
        ) : (
          <div className="box">
            <Image
              width={900}
              height={900}
              src="/avatar.jpg"
              alt="Picture of the author"
            />
            <h2>seed</h2>
            <DynamicSocialIcons />
            <BackgroundAudio />
          </div>
        )}
      </div>
    </body>
  );
}
