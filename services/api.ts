import { url } from "@/constant/api";
import { authToken } from "@/constant/message";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


const handleAxios = (base : string, token : string | undefined) => {
  return axios.create({
    baseURL: base,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` })

    },
  });
}

// ─────────────────────────────────────────────────────────────
export const createClientApi = async () => {
  const response = await fetch(url.GET_COOKIE,{
    credentials: "include"
  });
  const { token, refreshToken } = await response.json();

  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });

  // 401 interceptor — clears auth and sends user to login
  api.interceptors.response.use(
    (response) => response?.data,
    // (error) => {
    //   if (
    //     error.response?.status === 401 &&
    //     typeof window !== "undefined" &&
    //     !window.location.pathname.startsWith("/login") &&
    //     !window.location.pathname.startsWith("/signup")
    //   ) {
    //     window.location.href = "/login";
    //   }
    //   return Promise.reject(error);
    // }

    async (err) => {
      if (err?.response?.data?.message === authToken.EXPIRED) {
        console.log("enter");
        try {
          const api = await axios.create({
            baseURL: BASE_URL,
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
          );
          const refreshResponse = await api.get(url.REFRESH_TOKEN);
          console.log(refreshResponse.data,"refreshResponse.data",`http://localhost:3000${url.SET_COOKIE}`)
          //! set token in cookies again 
          if (!refreshResponse.data?.success) {
              throw new Error("Refresh token is not valid");
            }

            const newAccessToken =
              refreshResponse.data.token;

            if (!newAccessToken) {
              throw new Error(
                "New access token was not returned"
              );
            }
        await fetch(`http://localhost:3000${url.SET_COOKIE}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token : newAccessToken,
          refreshToken,
        }),
      });
          
            err.config.headers.Authorization =
              `Bearer ${newAccessToken}`;

          //   const apiRetry = await axios.create({
          //   baseURL: BASE_URL,
          //   headers: {
          //     Authorization: `Bearer ${newAccessToken}`,
          //   },
          // }
          // );

          // return apiRetry;
            // Retry original request
            return api(err.config);
          }
          catch (err) {
            return Promise.reject(err);
          }
      }
      return Promise.reject(err);
    }
  );

  return api;

}


// ─────────────────────────────────────────────────────────────
// SERVER-SIDE API  (used inside Server Components, layout.tsx,
//                  Route Handlers, Server Actions ONLY)
//
// Cannot be imported by any "use client" file.
// Reads the HTTP-only cookie via next/headers and forwards it
// as a Cookie header so the backend can authenticate the call.
// ─────────────────────────────────────────────────────────────
  export async function createServerApi() {
    // Dynamic import keeps next/headers out of the client bundle.
    // If this function is accidentally called client-side it will
    // throw — which is the correct behaviour.
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    let accessToken = cookieStore.get(process.env.NEXT_TOKEN ?? "accessToken")?.value;
    const refreshToken = cookieStore.get(process.env.NEXT_REFRESH_TOKEN ?? "refreshToken")?.value
    // Forward ALL cookies (including the HTTP-only JWT) to the
    // backend so it can authenticate server-side requests.


    const api = handleAxios(BASE_URL, accessToken)

    api.interceptors.response.use((response) => response?.data,
      async (err) => {
       if (err?.response?.data?.message === authToken.EXPIRED) {
          try {
            const refreshApi = axios.create({
              baseURL: BASE_URL,
              headers: {
                ...(refreshToken && {
                  Authorization: `Bearer ${refreshToken}`,
                }),
              },
            });
            const refreshResponse = await refreshApi.get(
              url.REFRESH_TOKEN
            );
            if (!refreshResponse.data?.success) {
              throw new Error("Refresh token is not valid");
            }

            const newAccessToken =
              refreshResponse.data.token;

            if (!newAccessToken) {
              throw new Error(
                "New access token was not returned"
              );
            }
          //! see what happen cookies not set because its server set server not in browser ok if suppose client call this then its set scuuess ok 
      //   await fetch("http://localhost:3000/api/set-cookie", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     token : newAccessToken,
      //     refreshToken,
      //   }),
      // });

            // Update token for retry
            accessToken = newAccessToken;
            err.config.headers.Authorization =
              `Bearer ${newAccessToken}`;

            // Retry original request
            return api(err.config);
          }
          catch (err) {
            return Promise.reject(err);
          }
        }
        return Promise.reject(err);
      }
    )
    return api;
  }

// ─────────────────────────────────────────────────────────────
// Error helper — works on both client and server
// ─────────────────────────────────────────────────────────────
export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
): string {
  if (axios.isAxiosError(error)) {
    return (
      (error.response?.data as { message?: string })?.message ?? fallback
    );
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

// Default export is the CLIENT api (backwards compatible)

