import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface AuthState {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

const useAuthtStore = create<AuthState>()(
  devtools(
    (set) => ({
      isLoggedIn: false,
      logIn: () => set(() => ({ isLoggedIn: true })),
      logOut: () => set(() => ({ isLoggedIn: false })),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthtStore;
