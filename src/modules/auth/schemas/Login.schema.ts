import { z } from "zod";

const required_error = "This field is required";
const passwordRegex = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*()]).{8,}$");

export const LoginSchema = z.object({
	email: z.string({ required_error }).email(),
	password: z.string({ required_error }).min(8).regex(passwordRegex, { message: "Must meet minimum password requirements." }),
});

export type LoginDto = z.infer<typeof LoginSchema>;
