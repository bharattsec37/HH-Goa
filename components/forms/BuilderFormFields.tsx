"use client";

import { useIdentityStore } from "@/lib/store";
import { Camera, Sparkles, Image as ImageIcon } from "lucide-react";
import { useRef, useState } from "react";
import WebcamModal from "../WebcamModal";

export default function BuilderFormFields() {
  const store = useIdentityStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [showWebcam, setShowWebcam] = useState(false);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    store.setPhotoUrl(url);
  };

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-[#032A1C] mb-1 tracking-widest uppercase font-space-mono">Name</label>
          <input
            type="text"
            value={store.name}
            onChange={(e) => store.setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#FAF8F1] border border-[#E5E0C8] text-sm text-[#032A1C] font-space-mono focus:outline-none focus:border-[#032A1C]"
            placeholder="Satyam Pandey"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-[#032A1C] mb-1 tracking-widest uppercase font-space-mono">Stack / Role</label>
          <input
            type="text"
            value={store.role}
            onChange={(e) => store.setRole(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#FAF8F1] border border-[#E5E0C8] text-sm text-[#032A1C] font-space-mono focus:outline-none focus:border-[#032A1C]"
            placeholder="e.g. FULL STACK DEVELOPER"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-[#032A1C] mb-1 tracking-widest uppercase font-space-mono">Team Name</label>
          <input
            type="text"
            value={store.team}
            onChange={(e) => store.setTeam(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#FAF8F1] border border-[#E5E0C8] text-sm text-[#032A1C] font-space-mono focus:outline-none focus:border-[#032A1C]"
            placeholder="e.g. DEVSPRINT"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-[#032A1C] mb-1 tracking-widest uppercase font-space-mono">Team Size</label>
          <select
            value={store.teamMembersCount}
            onChange={(e) => store.setTeamMembersCount(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#FAF8F1] border border-[#E5E0C8] text-sm text-[#032A1C] font-space-mono focus:outline-none focus:border-[#032A1C] appearance-none"
          >
            <option value="1 MEMBER">1 MEMBER</option>
            <option value="2 MEMBERS">2 MEMBERS</option>
            <option value="3 MEMBERS">3 MEMBERS</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-[#032A1C] mb-1 tracking-widest uppercase font-space-mono">Photo</label>
        <div className="flex items-center gap-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={(e) => { if(e.target.files?.[0]) handleFile(e.target.files[0]); }}
          />
          <input 
            type="file" 
            ref={cameraInputRef} 
            className="hidden" 
            accept="image/*"
            capture="user"
            onChange={(e) => { if(e.target.files?.[0]) handleFile(e.target.files[0]); }}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 px-4 py-2 bg-white border border-[#E5E0C8] rounded-lg text-xs font-space-mono text-[#032A1C] flex items-center justify-center hover:bg-gray-50"
          >
            {store.photoUrl ? "Photo Selected" : "Choose File"}
          </button>
          <button 
            onClick={() => setShowWebcam(true)}
            className="flex-1 px-4 py-2 bg-[#094F35] text-white rounded-lg text-xs font-space-mono font-bold flex items-center justify-center hover:bg-[#032A1C] shadow-md border-b-4 border-[#032A1C]"
          >
            <Camera className="w-3 h-3 mr-2" /> Take Selfie
          </button>
        </div>
        <p className="text-[9px] text-[#032A1C]/60 mt-2 font-space-mono">
          Use a clear portrait photo or click "Take Selfie" to snap one on the spot!
        </p>
      </div>

      {showWebcam && (
        <WebcamModal 
          onCapture={(dataUrl) => {
            store.setPhotoUrl(dataUrl);
            setShowWebcam(false);
          }} 
          onClose={() => setShowWebcam(false)} 
        />
      )}
    </div>
  );
}
