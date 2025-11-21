import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

app.get('/alive', (req: Request, res: Response) => {
   res.send('Hello! Server is ALIVE!!!');
});

app.get('/api/status', (req: Request, res: Response) => {
   res.json({
      status: 'Connected to the Backend!',
      timestamp: new Date().toISOString(),
   });
});

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
