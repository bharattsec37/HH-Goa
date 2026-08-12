"use client";

import { useIdentityStore } from "@/lib/store";
import { Camera, Sparkles, Image as ImageIcon } from "lucide-react";
import { useRef } from "react";

export default function BuilderFormFields() {
  const store = useIdentityStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

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
            onClick={() => cameraInputRef.current?.click()}
            className="flex-1 px-4 py-2 bg-[#094F35] text-white rounded-lg text-xs font-space-mono font-bold flex items-center justify-center hover:bg-[#032A1C] shadow-md border-b-4 border-[#032A1C]"
          >
            <Camera className="w-3 h-3 mr-2" /> Take Selfie
          </button>
        </div>
        <p className="text-[9px] text-[#032A1C]/60 mt-2 font-space-mono">
          Use a clear portrait photo or click "Take Selfie" to snap one on the spot!
        </p>
      </div>

      <div className="bg-[#E7EBD9] border border-[#D1D9B5] rounded-xl p-4 flex items-center">
        <div className="w-8 h-8 rounded-full bg-[#032A1C] text-hh-yellow flex items-center justify-center mr-4 shadow-sm">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[9px] font-bold text-[#032A1C] uppercase tracking-wider mb-1">Current Builder ID</div>
          <div className="text-sm font-space-mono text-[#032A1C] font-bold tracking-widest">{store.builderId}</div>
          <div className="text-[8px] text-[#032A1C]/60 mt-1 leading-tight">
            This ID is generated for this page session and changes after refresh.
          </div>
        </div>
      </div>

      <button className="w-full py-4 rounded-xl bg-[#032A1C] text-white font-bold font-jakarta text-sm flex items-center justify-center hover:bg-[#06442D] shadow-[0_4px_0_#021B12] active:translate-y-1 active:shadow-none transition-all uppercase tracking-wider">
        REGENERATE BUILDER ID CARD <Sparkles className="w-4 h-4 ml-2 text-hh-yellow" />
      </button>

    </div>
  );
}
