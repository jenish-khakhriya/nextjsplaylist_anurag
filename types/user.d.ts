
export type User = {
  email: string;
  username: string;
  profileImage?: string;
  role: string[];
};

export type HeaderProps = {
  user: User | null;
};