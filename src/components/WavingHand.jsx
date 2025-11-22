import React from "react";

export default function WavingHand({ size = 20 }) {
  return (
    <div
      style={{
        fontSize: `${size}px`,
        display: "inline-block",
        animation: "wave 1s infinite",
        transformOrigin: "70% 70%",
      }}
    >
      👋
      <style>
        {`
          @keyframes wave {
            0% { transform: rotate(0deg); }
            20% { transform: rotate(20deg); }
            40% { transform: rotate(-10deg); }
            60% { transform: rotate(15deg); }
            80% { transform: rotate(-5deg); }
            100% { transform: rotate(0deg); }
          }
        `}
      </style>
    </div>
  );
}
