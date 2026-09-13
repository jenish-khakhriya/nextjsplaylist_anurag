"use client";

import { useFormik } from "formik";
import { blogSchema } from "@/validation/blog.validation";
import { CreateBlogPayload } from "@/types/blog";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";

interface BlogFormProps {
  initialValues?: CreateBlogPayload;
  onSubmit: (values: CreateBlogPayload) => Promise<void>;
  submitLabel?: string;
  error?: string | null;
}

const defaultValues: CreateBlogPayload = {
  title: "",
  content: "",
  image: "",
};

export default function BlogForm({
  initialValues = defaultValues,
  onSubmit,
  submitLabel = "Publish Blog",
  error,
}: BlogFormProps) {
  const formik = useFormik<CreateBlogPayload>({
    initialValues,
    validationSchema: blogSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      // Strip empty image string so backend receives undefined rather than ""
      const payload: CreateBlogPayload = {
        title: values.title,
        content: values.content,
        ...(values.image ? { image: values.image } : {}),
      };
      await onSubmit(payload);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-5">
      <ErrorMessage message={error} />

      <Input
        id="title"
        label="Title"
        placeholder="Enter blog title"
        {...formik.getFieldProps("title")}
        error={formik.errors.title}
        touched={formik.touched.title}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="content" className="text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          rows={8}
          placeholder="Write your blog content here…"
          {...formik.getFieldProps("content")}
          className={[
            "block w-full rounded-lg border px-3 py-2 text-sm shadow-sm",
            "placeholder:text-gray-400 resize-y",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
            "transition-colors duration-150",
            formik.touched.content && formik.errors.content
              ? "border-red-400 bg-red-50"
              : "border-gray-300 bg-white",
          ].join(" ")}
        />
        {formik.touched.content && formik.errors.content && (
          <p className="text-xs text-red-600">{formik.errors.content}</p>
        )}
      </div>

      <Input
        id="image"
        label="Image URL (optional)"
        placeholder="https://example.com/image.jpg"
        {...formik.getFieldProps("image")}
        error={formik.errors.image}
        touched={formik.touched.image}
      />

      <Button
        type="submit"
        fullWidth
        loading={formik.isSubmitting}
        disabled={formik.isSubmitting}
      >
        {submitLabel}
      </Button>
    </form>
  );
}
