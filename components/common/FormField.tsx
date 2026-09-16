import { ErrorMessage, Field } from "formik";

type FormFieldProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  inputMode?:
    | "text"
    | "numeric"
    | "email"
    | "tel"
    | "url";
};

const FormField = ({
  name,
  label,
  type = "text",
  placeholder,
  inputMode,
}: FormFieldProps) => {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-zinc-300"
      >
        {label}
      </label>

      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        inputMode={inputMode}
        className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
      />

      <ErrorMessage
        name={name}
        component="p"
        className="mt-1.5 text-xs text-red-400"
      />

    </div>
  );
};

export default FormField;