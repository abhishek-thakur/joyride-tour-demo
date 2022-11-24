import { StateCreator } from "zustand";
import { MyStore } from ".";

interface UserState {
  user?: User | null;
  completed?: boolean;
  demoFlag?: boolean;
  setDemoFlag: (e: boolean) => void;
  setCompleted: (e: boolean) => void;
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
  demoFlag: undefined,
  setDemoFlag: (e: boolean) => set((_state) => ({ demoFlag: e })),
  setCompleted: (e: boolean) => set((_state) => ({ completed: e })),
  setUser: (newUser: User | null) => set((_state) => ({ user: newUser })),
});

export default createUserSlice;
export type { UserState, User };
