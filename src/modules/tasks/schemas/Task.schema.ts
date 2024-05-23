import { z } from "zod";

const required_error = "This field is required";

export const TaskSchema = z.object({
	title: z.string({ required_error }).min(5),
	maxDuration: z.number({ required_error }).min(1).max(25),
	authorName: z.string({ required_error }),
	authorEmail: z.string({ required_error }).email(),
});

export type TaskDto = z.infer<typeof TaskSchema>;
