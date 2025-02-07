"use server";

import { FieldValues } from "react-hook-form";

export const userLogin = async (loginData: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      cache: "no-store",
    }
  );
  const loggedInInfo = await res.json();
  return loggedInInfo;
};
