// import axios from "axios";

// const handleAxios = async () => {
//   const response = await fetch("http://localhost:3000/api/getcookie");

  
//   // if (!response.ok) {
//   //   throw new Error("Failed to get token");
//   // }

//   const tok = await response.json();
//   console.log(tok);
//   const api = axios.create({
//     baseURL:
//       process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
//     headers: {
//       "Content-Type": "application/json",
//       // Authorization: `Bearer ${token}`,
//     },
//   });

//   return api;
// };

// export default handleAxios;




// "use client"


import axios from "axios";
// import { cookies } from "next/headers";

const handleAxios = async () => {
  // const cookieStore = await cookies();

  // const token = cookieStore.get(process.env.TOKEN ?? "token")?.value;
  // const refresh_token = cookieStore.get(process.env.REFRESH_TOKEN ??"refresh_token")?.value;


  // console.log("TOKEN:", token);

  const api = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",

    headers: {
      // "Content-Type": "application/json",

      // ...(token && {
      //   Authorization: `Bearer ${token}`,
      // }),
    },
  });

  // api.interceptors.response.use((re))

  return api;
};

export default handleAxios;