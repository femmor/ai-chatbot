import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import z from 'zod';
import { chatService } from './services/chat.service';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5005;

app.get('/alive', (_req: Request, res: Response) => {
   res.send('Hello! Server is ALIVE!!!');
});

const chatSchema = z.object({
   userPrompt: z
      .string()
      .trim()
      .min(1, 'User prompt cannot be empty')
      .max(1000, 'Prompt is too long'),
   conversationId: z.uuid(),
});

app.post('/api/chat', async (req: Request, res: Response) => {
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
});

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
