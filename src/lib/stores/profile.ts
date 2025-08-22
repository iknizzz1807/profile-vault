import { writable } from "svelte/store";
import type { MasterProfile } from "$lib/types";

const initialProfile: MasterProfile = {
  profileInfo: {
    fullName: "",
    email: "",
    phoneNumber: "",
    website: "",
  },
  summary: {
    content: "",
  },
  workExperiences: [],
  educations: [],
  projects: [],
  skills: [],
};

export const profileData = writable<MasterProfile | null>(null);

export function createEmptyProfile(): MasterProfile {
  // Trả về một bản sao sâu để tránh thay đổi state ban đầu
  return JSON.parse(JSON.stringify(initialProfile));
}
