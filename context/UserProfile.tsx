"use client";

import { HeaderProps } from "@/types/user";
import { createContext, ReactNode } from "react";

type contextType = {
  user : HeaderProps | null
}

export const UserContext = createContext<contextType>({
  user : null
});

export function UserProvider({ user, children } : {user : HeaderProps,children : ReactNode}) {
  return (
    <UserContext.Provider value={{user}}>
      {children}
    </UserContext.Provider>
  );
}