import { UserContext } from "@/context/UserProfile"
import { useContext } from "react"

export const useAuth = () => {
    return useContext(UserContext);
}

