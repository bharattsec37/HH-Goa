"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, X } from "lucide-react";

interface WebcamModalProps {
  onCapture: (dataUrl: string) => void;
  onClose: () => void;
}

export default function WebcamModal({ onCapture, onClose }: WebcamModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError("Unable to access camera. Please make sure you have granted permissions.");
      }
    }
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      // Set canvas dimensions to match video stream
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Draw the current video frame onto the canvas
        // We need to mirror the context to match the mirrored video feed
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL("image/png");
        onCapture(dataUrl);
        
        // Stop stream
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        onClose();
      }
    }
  };

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#F4F1E1] rounded-3xl p-6 shadow-2xl border border-[#E5E0C8] w-full max-w-lg flex flex-col items-center relative">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#032A1C] hover:text-[#8C281F] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-yatra text-[#032A1C] uppercase mb-4">Take a Selfie</h2>
        
        {error ? (
          <div className="w-full p-4 bg-red-100 text-red-600 rounded-xl text-center font-space-mono text-sm">
            {error}
          </div>
        ) : (
          <div className="w-full relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center shadow-inner mb-6">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover transform scale-x-[-1]" // Mirror the video for natural selfie feel
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}

        <button 
          onClick={handleCapture}
          disabled={!!error}
          className="w-full py-4 bg-[#094F35] text-white rounded-xl font-bold font-space-mono uppercase tracking-widest hover:bg-[#032A1C] transition-all flex items-center justify-center shadow-md border-b-4 border-[#032A1C] disabled:opacity-50"
        >
          <Camera className="w-5 h-5 mr-2" /> Capture Photo
        </button>
      </div>
    </div>
  );
}
