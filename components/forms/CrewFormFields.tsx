"use client";

import { useIdentityStore } from "@/lib/store";
import { Camera } from "lucide-react";
import { useRef } from "react";

export default function CrewFormFields() {
  const store = useIdentityStore();
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);
  const cameraInputRef1 = useRef<HTMLInputElement>(null);
  const cameraInputRef2 = useRef<HTMLInputElement>(null);
  const cameraInputRef3 = useRef<HTMLInputElement>(null);

  const handleFile = (id: string, file: File) => {
    const url = URL.createObjectURL(file);
    store.updateCrewMember(id, { photoUrl: url });
  };

  const members = store.crewMembers;

  return (
    <div className="space-y-8">
      
      <div>
        <label className="block text-[10px] font-bold text-[#032A1C] mb-1 tracking-widest uppercase font-space-mono">Team / Squad Name</label>
        <input
          type="text"
          value={store.crewTeamName}
          onChange={(e) => store.setCrewTeamName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#FAF8F1] border border-[#E5E0C8] text-sm text-[#032A1C] font-space-mono focus:outline-none focus:border-[#032A1C]"
          placeholder="Your Squad Name"
        />
      </div>

      <div className="relative border-t border-dashed border-[#E5E0C8] pt-6">
        <div className="absolute -top-3 left-0 bg-[#F4F1E1] pr-2 text-[10px] font-bold text-[#8C281F] uppercase tracking-widest font-space-mono">
          SQUAD MEMBERS (MAX 3)
        </div>
        
        {/* Render Members */}
        {members.map((member, index) => {
          const isRequired = index === 0;
          const ref = index === 0 ? fileInputRef1 : index === 1 ? fileInputRef2 : fileInputRef3;
          const cameraRef = index === 0 ? cameraInputRef1 : index === 1 ? cameraInputRef2 : cameraInputRef3;
          
          return (
            <div key={member.id} className="bg-white/50 border border-[#E5E0C8] rounded-xl p-4 mb-4 relative">
              <div className="absolute -top-3 left-4 bg-[#094F35] text-white px-2 py-0.5 rounded text-[8px] font-bold font-space-mono uppercase tracking-wider">
                MEMBER {index + 1} {isRequired ? "(REQUIRED)" : "(OPTIONAL)"}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-[9px] font-bold text-[#032A1C]/60 mb-1 tracking-widest uppercase font-space-mono">Name</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => store.updateCrewMember(member.id, { name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#FAF8F1] border border-[#E5E0C8] text-xs text-[#032A1C] font-space-mono focus:outline-none focus:border-[#032A1C]"
                    placeholder={index === 0 ? "Bharat Patel" : "Member Name"}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-[#032A1C]/60 mb-1 tracking-widest uppercase font-space-mono">Role / Stack</label>
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => store.updateCrewMember(member.id, { role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#FAF8F1] border border-[#E5E0C8] text-xs text-[#032A1C] font-space-mono focus:outline-none focus:border-[#032A1C]"
                    placeholder="FULLSTACK / RUST"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-[9px] font-bold text-[#032A1C]/60 mb-1 tracking-widest uppercase font-space-mono">Builder Title</label>
                <input
                  type="text"
                  value={member.title}
                  onChange={(e) => store.updateCrewMember(member.id, { title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#FAF8F1] border border-[#E5E0C8] text-xs text-[#032A1C] font-space-mono focus:outline-none focus:border-[#032A1C]"
                  placeholder='"Captain Hacker"'
                />
              </div>

              <div className="mt-4">
                <label className="block text-[9px] font-bold text-[#032A1C]/60 mb-1 tracking-widest uppercase font-space-mono">Photo Avatar</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="file" 
                    ref={ref} 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => { if(e.target.files?.[0]) handleFile(member.id, e.target.files[0]); }}
                  />
                  <input 
                    type="file" 
                    ref={cameraRef} 
                    className="hidden" 
                    accept="image/*"
                    capture="user"
                    onChange={(e) => { if(e.target.files?.[0]) handleFile(member.id, e.target.files[0]); }}
                  />
                  <button 
                    onClick={() => ref.current?.click()}
                    className="flex-1 px-3 py-2 bg-white border border-[#E5E0C8] rounded-lg text-xs font-space-mono text-[#032A1C] flex items-center justify-center hover:bg-gray-50"
                  >
                    {member.photoUrl ? "Photo Selected" : "Choose File"}
                  </button>
                  <button 
                    onClick={() => cameraRef.current?.click()}
                    className="flex-1 px-3 py-2 bg-[#094F35] text-white rounded-lg text-[10px] font-space-mono font-bold flex items-center justify-center hover:bg-[#032A1C] shadow-md border-b-2 border-[#032A1C]"
                  >
                    <Camera className="w-3 h-3 mr-1" /> Take Selfie
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
