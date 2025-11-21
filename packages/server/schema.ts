import z from 'zod';

export const chatSchema = z.object({
   userPrompt: z
      .string()
      .trim()
      .min(1, 'User prompt cannot be empty')
      .max(1000, 'Prompt is too long'),
   conversationId: z.uuid(),
});
