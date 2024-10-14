import { z } from "zod";

const required_error = "This field is required";

export const BookSchema = z.object({
	title: z.string({ required_error }).min(5),
	description: z.string({ required_error }).min(20),
	content: z.string({ required_error }).min(10),
	coverImage: z.string({ required_error }).min(15),
	authorName: z.string({ required_error }).min(6),
});

export type BookDto = z.infer<typeof BookSchema>;
