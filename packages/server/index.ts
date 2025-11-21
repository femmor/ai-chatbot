import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const PORT = process.env.PORT || 5005;

app.get('/alive', (_req: Request, res: Response) => {
   res.send('Hello! Server is ALIVE!!!');
});

app.post('/api/chat', async (req: Request, res: Response) => {
   const { userPrompt } = req.body;

   try {
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         input: userPrompt,
         temperature: 0.7,
         max_output_tokens: 100,
      });

      res.json({
         message: response.output_text,
      });
   } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      res.status(500).json({ error: 'Error communicating with OpenAI' });
   }
});

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
