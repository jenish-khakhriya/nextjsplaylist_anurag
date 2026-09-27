"use client";



import { getCurrentUser } from "@/services/user.service";
import { UserType } from "@/types/user";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

type contextType = {
  profile : UserType,
  handleSetUser : (user : UserType) => void;
  loading : boolean;
}

export const UserContext = createContext<contextType>({
  profile : null,
  handleSetUser : (user) => {},
  loading : true
});

export function UserProvider({ children } : {children : ReactNode}) {
  const [profile,setProfile] = useState<UserType>(null);
  const [loading,setLoading] = useState(true);
  const handleSetUser = (user : UserType) => {
    setProfile(user);
  }

useEffect(() => {
  (async () => {
    try {
      setLoading(true);

      const user = await getCurrentUser();

      if (user?.success) {
        setProfile(user.data);
      } else {
        throw new Error(
          user?.message ?? "Something went wrong!"
        );
      }
    } catch (err) {
      console.log("GET USER ERROR:", err);
    } finally {
      setLoading(false);
    }
  })();
}, []);



  return (
    <UserContext.Provider value={{profile,handleSetUser,loading}}>
      {children}
    </UserContext.Provider>
  );
}