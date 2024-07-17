import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1, "title is required").max(255),
    description: z.string().min(1, "description is required").max(65535)
})

export const patchIssuesSchema = z.object({
    title: z.string().min(1, "title is required").max(255).optional(),
    description: z.string().min(1, "description is required").max(65535).optional(),
    assignedToUserId: z.string().min(1, "assigned to user is required").max(255).optional().nullable()
})