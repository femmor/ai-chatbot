import express, { type Request, type Response } from 'express';

const app = express();
const PORT = process.env.PORT || 5005;

app.get('/alive', (req: Request, res: Response) => {
    res.send('Hello! Server is ALIVE!!!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});