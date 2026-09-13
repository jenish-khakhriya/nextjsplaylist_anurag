import api from "./api";
import { Blog, CreateBlogPayload, UpdateBlogPayload } from "@/types/blog";

export const blogService = {
  async getBlogs(): Promise<Blog[]> {
    const res = await api.get<{ success: boolean; data: Blog[] }>("/blogs");
    return res.data.data;
  },

  async getBlogById(id: string): Promise<Blog> {
    const res = await api.get<{ success: boolean; data: Blog }>(`/blogs/${id}`);
    return res.data.data;
  },

  async createBlog(payload: CreateBlogPayload): Promise<Blog> {
    // Do NOT send author – the backend sets it from the authenticated cookie session.
    const res = await api.post<{ success: boolean; data: Blog }>("/blogs", payload);
    return res.data.data;
  },

  async updateBlog(id: string, payload: UpdateBlogPayload): Promise<Blog> {
    const res = await api.patch<{ success: boolean; data: Blog }>(`/blogs/${id}`, payload);
    return res.data.data;
  },

  async deleteBlog(id: string): Promise<void> {
    await api.delete(`/blogs/${id}`);
  },
};
