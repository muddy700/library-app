import { z } from "zod";

const required_error = "This field is required";

export const UpdateTaskSchema = z.object({
	title: z.string({ required_error }).min(5),
	maxDuration: z.number({ required_error }).min(1).max(25),
	published: z.boolean({ required_error }),
});

export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;
