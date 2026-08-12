import { create } from 'zustand';
import { BUILDER_TITLES } from './constants';
import { generateRandomNumber } from './utils';

export type CrewMember = {
  id: string;
  name: string;
  role: string;
  title: string;
  photoUrl: string | null;
};

type IdentityState = {
  // Builder ID State
  name: string;
  role: string;
  team: string;
  teamMembersCount: string;
  photoUrl: string | null;
  builderId: string;
  
  // Crew Frame State
  crewTeamName: string;
  crewMembers: CrewMember[];

  // General State
  frameId: string;
  title: string;
  traits: string[];
  legacyScore: number;
  
  setName: (name: string) => void;
  setRole: (role: string) => void;
  setTeam: (team: string) => void;
  setTeamMembersCount: (count: string) => void;
  setPhotoUrl: (url: string | null) => void;
  
  setCrewTeamName: (name: string) => void;
  updateCrewMember: (id: string, data: Partial<CrewMember>) => void;
  
  setFrameId: (id: string) => void;
  setTraits: (traits: string[]) => void;
  generateRandomIdentity: () => void;
};

const generateBuilderId = () => {
  return `HHGOA26-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};

export const useIdentityStore = create<IdentityState>((set) => ({
  name: 'Satyam Pandey',
  role: 'FULL STACK DEVELOPER',
  team: 'DEVSPRINT',
  teamMembersCount: '2 MEMBERS',
  photoUrl: null,
  builderId: generateBuilderId(),
  
  crewTeamName: '',
  crewMembers: [
    { id: '1', name: 'Bharat Patel', role: '', title: '', photoUrl: null },
    { id: '2', name: '', role: '', title: '', photoUrl: null },
    { id: '3', name: '', role: '', title: '', photoUrl: null },
  ],

  frameId: 'frame1',
  title: BUILDER_TITLES[0],
  traits: ['ships_fast', 'ai_native', 'problem_solver', 'open_source', 'coffee_powered'],
  legacyScore: 92,

  setName: (name) => set({ name }),
  setRole: (role) => set({ role }),
  setTeam: (team) => set({ team }),
  setTeamMembersCount: (teamMembersCount) => set({ teamMembersCount }),
  setPhotoUrl: (photoUrl) => set({ photoUrl }),
  
  setCrewTeamName: (crewTeamName) => set({ crewTeamName }),
  updateCrewMember: (id, data) => set((state) => ({
    crewMembers: state.crewMembers.map(member => 
      member.id === id ? { ...member, ...data } : member
    )
  })),

  setFrameId: (frameId) => set({ frameId }),
  setTraits: (traits) => set({ traits }),
  
  generateRandomIdentity: () => set({
    title: BUILDER_TITLES[generateRandomNumber(0, BUILDER_TITLES.length - 1)],
    legacyScore: generateRandomNumber(85, 99),
  })
}));

