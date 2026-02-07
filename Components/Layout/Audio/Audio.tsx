"use client";

import { AudioLines } from "lucide-react";
import React, { useRef, useState } from "react";

const Audio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.muted = false;
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Autoplay blocked:", err);
      }
    } else {
      audio.muted = true;
      audio.pause();
      setIsPlaying(false);
    }
  };

  

  return (
    <div className="fixed bottom-6 right-4 z-200">
      <button
        onClick={toggleAudio}
        className="relative p-3 rounded-full bg-[#2b3861] flex items-center justify-center text-white hover:scale-105 transition"
      >
        <AudioLines size={16} />
        {!isPlaying && (
          <span className="absolute w-0.5 h-5 bg-white rotate-45" />
        )}
      </button>

      <audio
        ref={audioRef}
        src="/audio/audio.mp3"
        loop
        playsInline
      />
    </div>
  );
};

export default Audio;
