"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  // Implement user registeration logic here
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    const storeCookies = await cookies();
    if (result.success && result.data?.accessToken) {
      storeCookies.set("accessToken", result.data.accessToken);
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  // Implement get login user logic here
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    const storeCookies = await cookies();
    if (result.success && result.data?.accessToken) {
      storeCookies.set("accessToken", result.data.accessToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  // Implement get current user logic here
  const storeCookies = await cookies();
  const accessToken = storeCookies.get("accessToken")?.value;
  let decodedUser = null;
  if (accessToken) {
    decodedUser = await jwtDecode(accessToken);
    return decodedUser;
  } else {
    return null;
  }
};

export const reCaptchaTokenVerification = async (token: string) => {
  // Implement reCaptcha token verification logic here
  try {
    const res = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_SITE_KEY!,
        response: token,
      }),
    });

    return res.json();
  } catch (err: any) {
    return Error(
      err.message || "Something went wrong during reCaptcha verification."
    );
  }
};

export const logout =async ()=>{
  const storeCookies = await cookies();
  storeCookies.delete("accessToken");
}