import { z } from "zod";

const required_error = "This field is required";

export const UserSchema = z.object({
	fullName: z.string({ required_error }).min(10),
	email: z.string({ required_error }).email(),
	phoneNumber: z.string({ required_error }).length(9),
	roleId: z.string({ required_error }).uuid({ message: required_error }),
	gender: z.string({ required_error }).length(1, { message: required_error }),
});

export type UserDto = z.infer<typeof UserSchema>;
