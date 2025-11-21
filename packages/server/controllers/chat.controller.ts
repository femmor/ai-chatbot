import type { Request, Response } from 'express';
import { chatSchema } from '../schema';
import { chatService } from '../services/chat.service';

export const chatController = {
   sendMessage: async (req: Request, res: Response) => {
      const parseResult = chatSchema.safeParse(req.body);

      if (!parseResult.success) {
         const errors = parseResult.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
         }));

         return res.status(400).json({
            error: errors,
         });
      }

      const { userPrompt, conversationId } = parseResult.data;

      try {
         const response = await chatService.sendMessage(
            conversationId,
            userPrompt
         );

         res.json({
            message: response.message,
         });
      } catch (error) {
         res.status(500).json({ error: 'Failed to generate a response' });
      }
   },
};
