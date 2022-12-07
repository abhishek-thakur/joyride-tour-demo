import { StateCreator } from "zustand";
import { MyStore } from ".";
import { page_index } from "../utils/joyride_encoding";

interface UserState {
  user?: User | null;
  completed?: string;
  setCompleted: (e: string) => void;
  setUser: (newUser: User | null) => void;
}
interface User {
  email: string;
}
let completed = "";
let completedString = () => {
  let temp = completed!.split("");
  for (let i = 0; i < Object.keys(page_index).length; i++) {
    temp[i] = "0";
  }
  return temp.join("");
};
const createUserSlice: StateCreator<
  MyStore,
  [["zustand/persist", unknown]],
  [],
  UserState
> = (set) => ({
  user: undefined,
  completed: String(completedString()!),
  setCompleted: (e: string) => set((_state) => ({ completed: e })),
  setUser: (newUser: User | null) => set((_state) => ({ user: newUser })),
});

export default createUserSlice;
export type { UserState, User };
