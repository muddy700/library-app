import { z } from "zod";

const required_error = "This field is required";
const passwordRegex = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*()]).{8,}$");

export const ChangePasswordSchema = z
	.object({
		oldPassword: z.string({ required_error }).min(8),
		newPassword: z.string({ required_error }).min(8).regex(passwordRegex, { message: "Must meet minimum password requirements." }),
		confirmPassword: z.string({ required_error }),
	})
	.refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, { message: "Passwords don't match.", path: ["confirmPassword"] });

export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
