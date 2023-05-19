"use client";
import { useState, useRef, useEffect } from "react";
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";
import EnterScreen from "../../components/EnterScreen";
import Image from "next/image";
import dynamic from "next/dynamic";
import "./globals.css";
import ParticleBackground from '../../components/Particle'

const DynamicSocialIcons = dynamic(
  () => import("../../components/SocialIcons"),
  {
    ssr: false,
  }
);

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleVolumeChange = (event: any) => {
    const volumeLevel = parseFloat(event.target.value);
    setVolume(volumeLevel);

    if (audioRef.current) {
      audioRef.current.volume = volumeLevel;
    }
  };

  return (
    <div className="background-music">
      <audio ref={audioRef} autoPlay loop>
        <source src="/music.mp3" type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
      <div className="enter-button" onClick={handlePlayPause}>
        {isPlaying ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />}
      </div>
      <div className="audio-controls">
        <div className="play-button">
          {isPlaying ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />}
        </div>
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

export default function Homepage() {
  const [showEnterScreen, setEnterScreen] = useState(true);
  const [shouldFadeIn, setShouldFadeIn] = useState(false); // Change the initial value to false

  const handleEnterClick = () => {
    setEnterScreen(false);
    setShouldFadeIn(true); // Trigger fade-in
    console.log("set");
  };

  useEffect(() => {
    setShouldFadeIn(true);
  }, []); // Add useEffect to trigger the fade-in effect on initial render

  const handleGoBack = () => {
    setEnterScreen(true); // Show the enter screen again
  };

  return (
    <div>
     <ParticleBackground />
      {showEnterScreen ? (
        <EnterScreen onEnterClick={handleEnterClick} />
      ) : (
        <>
          <div className={`box ${shouldFadeIn ? "fade-in" : ""}`}>
            <div className="box-content">
              <div className="image-container">
                <Image
                  width={900}
                  height={900}
                  src="/avatar.jpg"
                  alt="Picture of the author"
                />
              </div>
              <h2>seed</h2>
              <DynamicSocialIcons />
              <BackgroundMusic />
            </div>
            {!showEnterScreen && (
              <div className="back-button" onClick={handleGoBack}>
                Back
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
