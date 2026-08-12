"use client";

import { useIdentityStore } from "@/lib/store";
import { ArrowLeft, Download, Share2, Camera } from "lucide-react";
import BuilderFormFields from "./forms/BuilderFormFields";
import CrewFormFields from "./forms/CrewFormFields";
import { Stage, Layer, Image as KonvaImage, Text, Group, Rect } from "react-konva";
import useImage from "use-image";
import { useRef, useState } from "react";
import WebcamModal from "./WebcamModal";

export default function Editor({ onBack }: { onBack: () => void }) {
  const store = useIdentityStore();
  const stageRef = useRef<any>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // We map the frameId to the UI text
  const isCrew = store.frameId === "frame3";
  const isGoa = store.frameId === "frame2";
  const frameTitle = isGoa ? "GOA VIBES FRAME" : isCrew ? "OFFICIAL CREW FRAME" : "OFFICIAL EVENT PASS";

  // Dummy logic for loading the frame image
  const [frameImg] = useImage(
    store.frameId === "frame1" ? "/ID frame.png" :
    store.frameId === "frame3" ? "/Crew frame.png" : "/Photo Frame Transparent.png"
  );
  
  // Dummy logic for user image
  const [userImg] = useImage(store.photoUrl || "");
  const [crewImg1] = useImage(store.crewMembers[0]?.photoUrl || "");
  const [crewImg2] = useImage(store.crewMembers[1]?.photoUrl || "");

  const handleDownload = async () => {
    if (!stageRef.current) return;
    setIsExporting(true);
    try {
      const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `HH-Goa-${store.name || "ID"}.png`;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsExporting(false);
    }
  };

  const shareText = `I'm heading to Hacker House Goa 2026! 🌴 Check out my ${isCrew ? 'Crew' : isGoa ? 'Vibe' : 'Builder'} pass! #FrameInGoa`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : "https://hhgoa-omega.vercel.app/"; 

  const handleShareX = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleShareInstagram = () => {
    handleDownload();
    setTimeout(() => {
      alert("Image saved! You can now open Instagram and post it to your Story or Feed.");
      window.open("https://instagram.com", "_blank");
    }, 1000);
  };

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    store.setPhotoUrl(url);
  };

  const scale = isGoa ? 0.45 : 0.5; // Scale down for preview

  return (
    <div className="w-full flex flex-col items-center">
      <button onClick={onBack} className="self-start mb-8 flex items-center text-hh-cream/60 hover:text-hh-cream transition-colors font-space-mono">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Selection
      </button>

      <div className="w-full flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Left Column: Form Fields */}
        {!isGoa && (
          <div className="flex-1 w-full max-w-md mx-auto lg:max-w-none lg:w-1/3 bg-[#F4F1E1] rounded-3xl p-6 shadow-2xl border border-[#E5E0C8] flex flex-col">
            <div className="mb-6 flex justify-between items-start border-b border-[#E5E0C8] pb-4">
              <div>
                <span className="text-xs text-[#8C281F] font-bold tracking-widest uppercase block mb-1">
                  {isCrew ? "MASTER CREW FRAME • 2026" : "TRAVEL PASS • 2026"}
                </span>
                <h2 className="text-3xl font-yatra text-[#032A1C] uppercase">
                  {isCrew ? "SQUAD DETAILS" : "YOUR BUILDER DETAILS"}
                </h2>
              </div>
              <div className="bg-white border border-[#E5E0C8] px-3 py-1 rounded-full text-xs font-space-mono text-[#032A1C]">
                {isCrew ? "Max 3 Members" : "New Builder ID"}
              </div>
            </div>

            <div className="flex-grow overflow-y-auto no-scrollbar pr-2">
              {isCrew ? <CrewFormFields /> : <BuilderFormFields />}
            </div>
          </div>
        )}

        {/* Right Column: Preview & Export */}
        <div className={`${isGoa ? 'w-full max-w-2xl mx-auto' : 'flex-[2] w-full'} bg-[#F4F1E1] rounded-3xl p-6 shadow-2xl border border-[#E5E0C8] flex flex-col items-center justify-between`}>
          <div className="w-full mb-6 flex justify-between items-start border-b border-[#E5E0C8] pb-4">
            <div>
              <span className="text-xs text-[#8C281F] font-bold tracking-widest uppercase block mb-1">
                {frameTitle}
              </span>
              <h2 className="text-3xl font-yatra text-[#032A1C] uppercase">PREVIEW</h2>
              <p className="text-xs text-[#032A1C]/60 font-space-mono">Master template composite</p>
            </div>
            <div className="bg-white border border-[#E5E0C8] px-3 py-1 rounded-full text-xs font-space-mono text-[#032A1C]">
              {isCrew ? "1400 × 1100" : isGoa ? "1080 × 1080" : "1055 × 1491"}
            </div>
          </div>

          {/* Konva Preview Area */}
          <div className="relative rounded-2xl overflow-hidden bg-[#032A1C] shadow-inner mb-6 flex items-center justify-center p-4 w-full min-h-[500px]">
             <div className="bg-black/20 rounded-xl overflow-hidden shadow-2xl">
               <Stage 
                  width={(isCrew ? 1400 : isGoa ? 1080 : 1055) * scale} 
                  height={(isCrew ? 1100 : isGoa ? 1080 : 1491) * scale} 
                  scaleX={scale} scaleY={scale} 
                  ref={stageRef}
                >
                  <Layer>
                    {/* Goa Frame background photo */}
                    {isGoa && userImg && (
                      <KonvaImage 
                        image={userImg} 
                        x={165} y={165} 
                        width={750} height={750} 
                      />
                    )}

                    {/* Background Template */}
                    {frameImg && <KonvaImage image={frameImg} width={isCrew ? 1400 : isGoa ? 1080 : 1055} height={isCrew ? 1100 : isGoa ? 1080 : 1491} />}
                    
                    {/* Builder Pass specific rendering */}
                    {!isCrew && !isGoa && (
                      <>
                        {/* User Photo */}
                        {userImg && (
                          <Group
                            clipFunc={(ctx) => {
                              // Tighter circle to prevent bleeding over the gold ring and sticker
                              ctx.arc(527, 500, 280, 0, Math.PI * 2, false);
                            }}
                          >
                            <KonvaImage 
                              image={userImg} 
                              x={247} y={220} 
                              width={560} height={560} 
                            />
                          </Group>
                        )}
                        
                        {/* User Info Texts */}
                        {store.name && (
                          <Text 
                            text={store.name.toUpperCase()} 
                            x={0} y={850} width={1055} align="center"
                            fontSize={100} fontFamily="Bebas Neue" fill="#032A1C" fontStyle="bold"
                          />
                        )}
                        
                        {/* Detail Section: Role & Team */}
                        <Group x={100} y={1090}>
                          {/* STACK / ROLE */}
                          <Text 
                            text="STACK / ROLE" 
                            x={0} y={0} 
                            fontSize={22} fontFamily="Space Mono" fill="#FF007A" fontStyle="bold"
                          />
                          {store.role && (
                            <Text 
                              text={store.role.toUpperCase()} 
                              x={0} y={35} width={450}
                              fontSize={36} fontFamily="Bebas Neue" fill="#032A1C" fontStyle="bold"
                            />
                          )}
                        </Group>

                        <Group x={650} y={1090}>
                          {/* TEAM */}
                          <Text 
                            text="TEAM" 
                            x={0} y={0} 
                            fontSize={22} fontFamily="Space Mono" fill="#FF007A" fontStyle="bold"
                          />
                          {store.team && (
                            <Text 
                              text={store.team.toUpperCase()} 
                              x={0} y={35} width={400}
                              fontSize={36} fontFamily="Bebas Neue" fill="#032A1C" fontStyle="bold"
                            />
                          )}
                          {store.teamMembersCount && (
                            <Text 
                              text={store.teamMembersCount.toUpperCase()} 
                              x={0} y={75} width={400}
                              fontSize={24} fontFamily="Bebas Neue" fill="#006B3C" fontStyle="bold"
                            />
                          )}
                        </Group>
                      </>
                    )}

                    {/* Crew Frame specific rendering */}
                    {isCrew && (
                      <>
                        {/* Member 1 */}
                        {crewImg1 && (
                          <Group
                            clipFunc={(ctx) => {
                              ctx.arc(430, 490, 180, 0, Math.PI * 2, false);
                            }}
                          >
                            <KonvaImage 
                              image={crewImg1} 
                              x={250} y={310} 
                              width={360} height={360} 
                            />
                          </Group>
                        )}
                        {store.crewMembers[0]?.name && (
                          <Text 
                             text={store.crewMembers[0].name.toUpperCase()} 
                             x={230} y={680} width={400} align="center"
                             fontSize={52} 
                             fontFamily="Bebas Neue" fill="#FAF8F1" 
                          />
                        )}
                        
                        <Group x={190} y={850}>
                          {/* Patch to cover baked-in title if any */}
                          <Rect x={-5} y={-5} width={350} height={50} fill="#F2EFE1" />
                          {store.crewMembers[0]?.title && (
                            <Text 
                               text={store.crewMembers[0].title} 
                               x={0} y={0} width={400}
                               fontSize={36} fontFamily="Yatra One" fill="#032A1C" 
                            />
                          )}
                          <Text 
                            text="STACK / ROLE" 
                            x={0} y={70} 
                            fontSize={18} fontFamily="Space Mono" fill="#FF007A" fontStyle="bold"
                          />
                          {store.crewMembers[0]?.role && (
                            <Text 
                               text={store.crewMembers[0].role.toUpperCase()} 
                               x={0} y={95} width={400}
                               fontSize={28} fontFamily="Bebas Neue" fill="#032A1C" fontStyle="bold"
                            />
                          )}
                        </Group>

                        {/* Member 2 */}
                        {crewImg2 && (
                          <Group
                            clipFunc={(ctx) => {
                              ctx.arc(970, 490, 180, 0, Math.PI * 2, false);
                            }}
                          >
                            <KonvaImage 
                              image={crewImg2} 
                              x={790} y={310} 
                              width={360} height={360} 
                            />
                          </Group>
                        )}
                        {store.crewMembers[1]?.name && (
                          <Text 
                             text={store.crewMembers[1].name.toUpperCase()} 
                             x={765} y={680} width={400} align="center"
                             fontSize={52} 
                             fontFamily="Bebas Neue" fill="#FAF8F1" 
                          />
                        )}
                        
                        <Group x={725} y={850}>
                          <Rect x={-5} y={-5} width={350} height={50} fill="#F2EFE1" />
                          {store.crewMembers[1]?.title && (
                            <Text 
                               text={store.crewMembers[1].title} 
                               x={0} y={0} width={400}
                               fontSize={36} fontFamily="Yatra One" fill="#032A1C" 
                            />
                          )}
                          <Text 
                            text="STACK / ROLE" 
                            x={0} y={70} 
                            fontSize={18} fontFamily="Space Mono" fill="#FF007A" fontStyle="bold"
                          />
                          {store.crewMembers[1]?.role && (
                            <Text 
                               text={store.crewMembers[1].role.toUpperCase()} 
                               x={0} y={95} width={400}
                               fontSize={28} fontFamily="Bebas Neue" fill="#032A1C" fontStyle="bold"
                            />
                          )}
                        </Group>

                        {/* Squad Name Header Overlay */}
                        {store.crewTeamName && (
                          <Text 
                            text={store.crewTeamName.toUpperCase()} 
                            x={110} y={150} width={600}
                            fontSize={40} fontFamily="Bebas Neue" fill="#032A1C" fontStyle="bold"
                          />
                        )}
                      </>
                    )}
                  </Layer>
               </Stage>
             </div>
          </div>

          {isGoa && (
            <div className="w-full flex gap-4 mb-6">
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
                className="flex-1 px-4 py-3 bg-white border border-[#E5E0C8] rounded-xl text-sm font-space-mono text-[#032A1C] font-bold hover:bg-gray-50 flex justify-center items-center shadow-sm"
              >
                Choose File
              </button>
              <button 
                onClick={() => setShowWebcam(true)}
                className="flex-1 px-4 py-3 bg-[#094F35] text-white rounded-xl text-sm font-space-mono font-bold hover:bg-[#032A1C] shadow-md border-b-4 border-[#032A1C] flex justify-center items-center"
              >
                <Camera className="w-4 h-4 mr-2" /> Take Selfie
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-between">
            <button 
              onClick={handleDownload}
              disabled={isExporting}
              className="flex-1 py-4 rounded-xl bg-white/80 border border-[#E5E0C8] text-[#032A1C] hover:bg-white transition-all font-bold text-sm uppercase tracking-wider font-space-mono flex items-center justify-center shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" /> {isExporting ? "Saving..." : `DOWNLOAD ${isCrew ? 'CREW' : isGoa ? 'FRAME' : 'BUILDER'} ID`}
            </button>
            
            {!showShare ? (
              <button 
                onClick={() => setShowShare(true)}
                className="flex-1 py-4 rounded-xl bg-white/80 border border-[#E5E0C8] text-[#032A1C] hover:bg-white transition-all font-bold text-sm uppercase tracking-wider font-space-mono flex items-center justify-center shadow-sm"
              >
                <Share2 className="w-4 h-4 mr-2" /> SHARE {isCrew ? 'CREW' : isGoa ? 'FRAME' : 'BUILDER'} ID
              </button>
            ) : (
              <div className="flex-1 flex gap-2">
                <button 
                  onClick={handleShareX}
                  className="flex-1 py-4 rounded-xl bg-black text-white hover:bg-gray-800 transition-all flex items-center justify-center shadow-sm"
                  title="Share on X"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </button>
                <button 
                  onClick={handleShareLinkedIn}
                  className="flex-1 py-4 rounded-xl bg-[#0A66C2] text-white hover:bg-[#004182] transition-all flex items-center justify-center shadow-sm"
                  title="Share on LinkedIn"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </button>
                <button 
                  onClick={handleShareInstagram}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:opacity-90 transition-all flex items-center justify-center shadow-sm"
                  title="Share on Instagram"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>

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
