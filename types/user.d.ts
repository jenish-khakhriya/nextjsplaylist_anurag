

export type AddressTypes = {
  pincode : string;
  block_no : string;
  country : string,
  state : string,
  city : string;
} | null;


export type UserType = {
  _id : string;
  username : string;
  email : string;
  profileImage : string;
  role : ("manager" | "admin" | "user")[];
  createdAt : NativeDate;
  updatedAt : NativeDate;
  address : AddressTypes;
} | null;

export type getProfileType = {
  message : string;
  success : boolean;
  data : userType
} | null;


