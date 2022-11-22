import { StateCreator } from "zustand";
import { MyStore } from ".";

interface UserState {
  user?: User | null;
  completed?: boolean;
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
  setCompleted: (e: boolean) =>
    set((_state) => ({ completed: !_state.completed })),
  setUser: (newUser: User | null) => set((_state) => ({ user: newUser })),
});

export default createUserSlice;
export type { UserState, User };
