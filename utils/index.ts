export const getName = (pathName : string) : string => {
    switch(pathName){
        case "/profile":
            return "Profile"
        case "/settings":
             return "Settings";
        case "/manage-followers":
             return "Manage Followers";
        default :
            return ""
    }
}