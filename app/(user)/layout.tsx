import Header from "@/components/layout/header"

const UserLayout = ({children} : {children : React.ReactNode}) => {
    
    return <>
         <Header/>
         {children}
    </>
}

export default UserLayout;