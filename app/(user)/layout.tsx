import Header from "@/components/layout/header"
import { getCurrentUser } from "@/services/user.service";
import { UserType } from "@/types/user";

const UserLayout = ({children} : {children : React.ReactNode}) => {
    
    return <>
         <Header/>
         {children}
    </>
}

export default UserLayout;