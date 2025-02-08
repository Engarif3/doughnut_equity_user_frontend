"use server";

export const registerCompany = async (formDataToServer: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/register-company`,
    {
      method: "POST",
      body: formDataToServer,
      cache: "no-store",
    }
  );
  const companyInfo = await res.json();
  return companyInfo;
};
