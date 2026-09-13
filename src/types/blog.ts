import { User } from "./user";

export interface Blog {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogPayload {
  title: string;
  content: string;
  image?: string;
}

export interface UpdateBlogPayload {
  title?: string;
  content?: string;
  image?: string;
}
