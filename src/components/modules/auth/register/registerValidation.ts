import z from "zod";

export const registerValidation = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(2, "Name must be at between 2 characters.")
    .max(50, "Name must be at most 50 characters."),
    email:z.string().nonempty({message:"Email is required"}).email("Invalid email address"),
    password:z.string().nonempty({message:"Password is required"}).min(6,"Password must be at least 6 characters long."),
    passwordConfirm:z.string().nonempty({message:"Please confirm your password."}),
});