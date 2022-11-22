import create from "zustand";
import createUserSlice, { UserState } from "./user";
import { persist } from "zustand/middleware";

export type MyStore = UserState;
const useStore = create<MyStore>()(
  persist(
    (...set) => ({
      ...createUserSlice(...set),
    }),
    {
      name: "joyride-demo",
    }
  )
);

export default useStore;
