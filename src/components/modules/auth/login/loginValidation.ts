import z from "zod";

export const loginValidation = z.object({
    email: z.string().nonempty({ message: "Email is required" }).email("Invalid email address"),
    password: z.string().nonempty({ message: "Password is required" }).min(6, "Password must be at least 6 characters long."),
})