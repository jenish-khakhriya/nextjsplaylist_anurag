export type UserLoginType = {
  username : string;
  email : string;
  profileImage : string;
  role : ("manager" | "admin" | "user")[];
  createdAt : NativeDate;
  updatedAt : NativeDate;
} | null;

export type getLoginType = {
  message : string;
  success : boolean;
  user : userType
  token : string;
  refreshToken : string;
} | null;


export type getSignupType = {
  message : string;
  success : boolean;
} | null;