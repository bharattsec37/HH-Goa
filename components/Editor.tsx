"use client";

import { useIdentityStore } from "@/lib/store";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import BuilderFormFields from "./forms/BuilderFormFields";
import CrewFormFields from "./forms/CrewFormFields";
import { Stage, Layer, Image as KonvaImage, Text, Group, Rect } from "react-konva";
import useImage from "use-image";
import { useRef, useState } from "react";

export default function Editor({ onBack }: { onBack: () => void }) {
  const store = useIdentityStore();
  const stageRef = useRef<any>(null);
  const [isExporting, setIsExporting] = useState(false);

  // We map the frameId to the UI text
  const isCrew = store.frameId === "frame3";
  const frameTitle = isCrew ? "OFFICIAL CREW FRAME" : "OFFICIAL EVENT PASS";

  // Dummy logic for loading the frame image
  const [frameImg] = useImage(
    store.frameId === "frame1" ? "/ID frame.png" :
    store.frameId === "frame3" ? "/Crew frame.png" : "/frames/goa.jpg"
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

  const scale = 0.5; // Scale down for preview

  return (
    <div className="w-full flex flex-col items-center">
      <button onClick={onBack} className="self-start mb-8 flex items-center text-hh-cream/60 hover:text-hh-cream transition-colors font-space-mono">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Selection
      </button>

      <div className="w-full flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Left Column: Form Fields */}
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

        {/* Right Column: Preview & Export */}
        <div className="flex-[2] w-full bg-[#F4F1E1] rounded-3xl p-6 shadow-2xl border border-[#E5E0C8] flex flex-col items-center justify-between">
          <div className="w-full mb-6 flex justify-between items-start border-b border-[#E5E0C8] pb-4">
            <div>
              <span className="text-xs text-[#8C281F] font-bold tracking-widest uppercase block mb-1">
                {frameTitle}
              </span>
              <h2 className="text-3xl font-yatra text-[#032A1C] uppercase">PREVIEW</h2>
              <p className="text-xs text-[#032A1C]/60 font-space-mono">Master template composite</p>
            </div>
            <div className="bg-white border border-[#E5E0C8] px-3 py-1 rounded-full text-xs font-space-mono text-[#032A1C]">
              {isCrew ? "1024 × 1024" : "1055 × 1491"}
            </div>
          </div>

          {/* Konva Preview Area */}
          <div className="relative rounded-2xl overflow-hidden bg-[#032A1C] shadow-inner mb-6 flex items-center justify-center p-4 w-full min-h-[500px]">
             <div className="bg-black/20 rounded-xl overflow-hidden shadow-2xl">
               <Stage 
                  width={(isCrew ? 1400 : 1055) * scale} 
                  height={(isCrew ? 1100 : 1491) * scale} 
                  scaleX={scale} scaleY={scale} 
                  ref={stageRef}
                >
                  <Layer>
                    {/* Background Template */}
                    {frameImg && <KonvaImage image={frameImg} width={isCrew ? 1400 : 1055} height={isCrew ? 1100 : 1491} />}
                    
                    {/* Builder Pass specific rendering */}
                    {!isCrew && (
                      <>
                        {/* User Photo */}
                        {userImg && (
                          <Group
                            clipFunc={(ctx) => {
                              // Tighter circle to prevent bleeding over the gold ring and sticker
                              ctx.arc(527, 540, 305, 0, Math.PI * 2, false);
                            }}
                          >
                            <KonvaImage 
                              image={userImg} 
                              x={222} y={235} 
                              width={610} height={610} 
                            />
                          </Group>
                        )}
                        
                        {/* User Info Texts */}
                        {store.name && (
                          <Text 
                            text={store.name.toUpperCase()} 
                            x={0} y={880} width={1055} align="center"
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
                              ctx.arc(450, 490, 180, 0, Math.PI * 2, false);
                            }}
                          >
                            <KonvaImage 
                              image={crewImg1} 
                              x={270} y={310} 
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
                              ctx.arc(950, 490, 180, 0, Math.PI * 2, false);
                            }}
                          >
                            <KonvaImage 
                              image={crewImg2} 
                              x={770} y={310} 
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-between">
            <button 
              onClick={handleDownload}
              disabled={isExporting}
              className="flex-1 py-4 rounded-xl bg-white/80 border border-[#E5E0C8] text-[#032A1C] hover:bg-white transition-all font-bold text-sm uppercase tracking-wider font-space-mono flex items-center justify-center shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" /> {isExporting ? "Saving..." : `DOWNLOAD ${isCrew ? 'CREW' : 'BUILDER'} ID`}
            </button>
            
            <button 
              className="flex-1 py-4 rounded-xl bg-white/80 border border-[#E5E0C8] text-[#032A1C] hover:bg-white transition-all font-bold text-sm uppercase tracking-wider font-space-mono flex items-center justify-center shadow-sm"
            >
              <Share2 className="w-4 h-4 mr-2" /> SHARE {isCrew ? 'CREW' : 'BUILDER'} ID
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
