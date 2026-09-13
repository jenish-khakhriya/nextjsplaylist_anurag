import * as Yup from "yup";

export const blogSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  content: Yup.string()
    .min(10, "Content must be at least 10 characters")
    .required("Content is required"),
  image: Yup.string()
    .url("Must be a valid URL")
    .optional(),
});
