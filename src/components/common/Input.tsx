import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
}

export default function Input({
  label,
  error,
  touched,
  id,
  className = "",
  ...props
}: InputProps) {
  const showError = touched && error;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={[
          "block w-full rounded-lg border px-3 py-2 text-sm shadow-sm",
          "placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
          "transition-colors duration-150",
          showError
            ? "border-red-400 bg-red-50 focus:ring-red-400 focus:border-red-400"
            : "border-gray-300 bg-white",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      {showError && (
        <p className="text-xs text-red-600 mt-0.5">{error}</p>
      )}
    </div>
  );
}
