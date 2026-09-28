export const getName = (pathName: string): string => {
    switch (pathName) {
        case "profile":
            return "Profile"
        case "settings":
            return "Settings";
        case "manage-followers":
            return "Manage Followers";
        default:
            return ""
    }
}


export const getMenu = (pathName: string): string => {
    switch (pathName) {
        case "/followers":
            return "Followers"
        case "/following":
            return "Followings";
        case "/received":
            return "Request Received";
        case "/requested":
            return "Requested";
        default:
            return ""
    }
}