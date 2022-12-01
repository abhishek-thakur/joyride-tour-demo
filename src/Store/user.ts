import { StateCreator } from "zustand";
import { MyStore } from ".";

interface UserState {
  user?: User | null;
  completed?: string;
  setCompleted: (e: string) => void;
  setUser: (newUser: User | null) => void;
}
interface User {
  email: string;
}

const createUserSlice: StateCreator<
  MyStore,
  [["zustand/persist", unknown]],
  [],
  UserState
> = (set) => ({
  user: undefined,
  completed: undefined,
  setCompleted: (e: string) => set((_state) => ({ completed: e })),
  setUser: (newUser: User | null) => set((_state) => ({ user: newUser })),
});

export default createUserSlice;
export type { UserState, User };
