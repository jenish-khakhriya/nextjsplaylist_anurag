"use client";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormField from "../common/FormField";

import { toast } from "react-toastify";
import { useState } from "react";
import { createClientApi } from "@/services/api";
import { getSignupType } from "@/types/auth";
import { useRouter } from "next/navigation";
import { static_url, url } from "@/constant/api";

interface SignUpValues {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;

  profileImage: File | null;

  address: {
    pincode: string;
    state: string;
    country: string;
    block_no: string;
    city: string;
  };
}

const initialValues: SignUpValues = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",

  profileImage: null,

  address: {
    pincode: "",
    state: "",
    country: "",
    block_no: "",
    city: "",
  },
};

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .required("Username is required"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  repeatPassword: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    )
    .required("Please repeat your password"),

  profileImage: Yup.mixed<File>()
    .nullable()
    .test(
      "fileSize",
      "Image must be less than 5MB",
      (file) => {
        if (!file) return true;

        return file.size <= 5 * 1024 * 1024;
      }
    )
    .test(
      "fileType",
      "Only JPG, JPEG, PNG or WEBP images are allowed",
      (file) => {
        if (!file) return true;

        return [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ].includes(file.type);
      }
    ),

  address: Yup.object({
    pincode: Yup.string()
      .matches(
        /^[0-9]{6}$/,
        "Pincode must be 6 digits"
      )
      .required("Pincode is required"),

    state: Yup.string()
      .trim()
      .required("State is required"),

    country: Yup.string()
      .trim()
      .required("Country is required"),

    block_no: Yup.string()
      .trim()
      .required("Block / House number is required"),

    city: Yup.string()
      .trim()
      .required("City is required"),
  }),
});

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
    const {push} = useRouter();
  const handleSubmit = async (values: SignUpValues) => {
  
    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append(
      "repeatPassword",
      values.repeatPassword
    );

    // Profile image
    if (values.profileImage) {
      formData.append(
        "profileImage",
        values.profileImage
      );
    }

    // Address
    formData.append(
      "address[pincode]",
      values.address.pincode
    );

    formData.append(
      "address[state]",
      values.address.state
    );

    formData.append(
      "address[country]",
      values.address.country
    );

    formData.append(
      "address[block_no]",
      values.address.block_no
    );

    formData.append(
      "address[city]",
      values.address.city
    );

    // formData.append(
    //   "expireSecond",
    //   540
    // );

    // Example API request
    try {
      setLoading(true);
      const api = await createClientApi();

      const response : getSignupType = await api.post(
        url.REGISTER,
        formData
      );
      if(!response?.success){
        throw new Error("something went wrong");
      }

      toast.success(response?.message);
      push(static_url.LOGIN);
      // if(response)
    }
    catch (err) {
      if (err instanceof Error)
        toast.error(err.message)
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black px-4 py-12 text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-200px] left-[-100px] h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute right-[-150px] top-1/3 h-[450px] w-[450px] rounded-full bg-pink-600/10 blur-[140px]" />

      <div className="relative mx-auto w-full max-w-3xl">

        {/* Gradient border */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-sm" />

        <div className="relative rounded-3xl border border-white/10 bg-zinc-950/95 p-6 shadow-2xl backdrop-blur-xl sm:p-10">

          {/* Header */}
          <div className="mb-10 text-center">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/20">

              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 21a6 6 0 0 1 12 0"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 8v6m3-3h-6"
                />
              </svg>

            </div>

            <h1 className="text-3xl font-bold">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Create an account and join us today.
            </p>

          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              isSubmitting,
              setFieldValue,
              values,
            }) => (

              <Form className="space-y-8">

                {/* ================= PROFILE IMAGE ================= */}

                <section>

                  <div className="mb-5">

                    <h2 className="text-lg font-semibold">
                      Profile Picture
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                      Upload a profile picture. Maximum 5MB.
                    </p>

                  </div>

                  <div className="flex flex-col items-center gap-5 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 p-6 sm:flex-row">

                    {/* Preview */}
                    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-700 bg-zinc-900">

                      {values.profileImage ? (

                        <img
                          src={URL.createObjectURL(
                            values.profileImage
                          )}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />

                      ) : (

                        <svg
                          className="h-10 w-10 text-zinc-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="8"
                            r="4"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 21a8 8 0 0 1 16 0"
                          />
                        </svg>

                      )}

                    </div>

                    <div className="flex-1 text-center sm:text-left">

                      <label
                        htmlFor="profileImage"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold transition hover:from-blue-500 hover:to-purple-500"
                      >

                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16V4m0 0-4 4m4-4 4 4"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"
                          />
                        </svg>

                        Choose Image

                      </label>

                      <input
                        id="profileImage"
                        name="profileImage"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(event) => {

                          const file =
                            event.currentTarget.files?.[0] ?? null;

                          setFieldValue(
                            "profileImage",
                            file
                          );

                        }}
                      />

                      {values.profileImage && (
                        <p className="mt-2 truncate text-xs text-zinc-500">
                          {values.profileImage.name}
                        </p>
                      )}

                      <ErrorMessage
                        name="profileImage"
                        component="p"
                        className="mt-2 text-xs text-red-400"
                      />

                    </div>

                  </div>

                </section>

                {/* ================= ACCOUNT ================= */}

                <section>

                  <div className="mb-5">

                    <h2 className="text-lg font-semibold">
                      Account Information
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                      Enter your account credentials.
                    </p>

                  </div>

                  <div className="grid gap-5 md:grid-cols-2">

                    <FormField
                      name="username"
                      label="Username"
                      placeholder="Enter username"
                    />

                    <FormField
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="you@example.com"
                    />

                    <FormField
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="Create password"
                    />

                    <FormField
                      name="repeatPassword"
                      label="Repeat Password"
                      type="password"
                      placeholder="Repeat password"
                    />

                  </div>

                </section>

                <div className="h-px bg-zinc-800" />

                {/* ================= ADDRESS ================= */}

                <section>

                  <div className="mb-5">

                    <h2 className="text-lg font-semibold">
                      Address
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                      Enter your address information.
                    </p>

                  </div>

                  <div className="grid gap-5 md:grid-cols-2">

                    <FormField
                      name="address.country"
                      label="Country"
                      placeholder="India"
                    />

                    <FormField
                      name="address.state"
                      label="State"
                      placeholder="Gujarat"
                    />

                    <FormField
                      name="address.city"
                      label="City"
                      placeholder="Surat"
                    />

                    <FormField
                      name="address.pincode"
                      label="Pincode"
                      placeholder="395001"
                      inputMode="numeric"
                    />

                    <div className="md:col-span-2">

                      <FormField
                        name="address.block_no"
                        label="Block / House Number"
                        placeholder="Enter block, house or apartment number"
                      />

                    </div>

                  </div>

                </section>

                {/* Terms */}
                <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">

                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 accent-purple-500"
                  />

                  <label
                    htmlFor="terms"
                    className="text-xs leading-5 text-zinc-500"
                  >
                    I agree to the Terms of Service and
                    Privacy Policy.
                  </label>

                </div>

                {/* Submit */}
                {loading ? <div className="w-full flex justify-center item-center rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:scale-[1.01] hover:shadow-purple-600/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">
                  <div className="w-5 h-5 border-t-white border-x-transparent animate-spin border-[3px] rounded-full "></div>
                </div> : <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:scale-[1.01] hover:shadow-purple-600/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Creating account..."
                    : "Create Account"}
                </button>}

              </Form>
            )}

          </Formik>

        </div>
      </div>
    </div>
  );
};

export default SignUpForm;


