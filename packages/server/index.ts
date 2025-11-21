import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat.routes';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/alive', (_req: Request, res: Response) => {
   res.send('API is ALIVE!!!');
});

// Routes
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
