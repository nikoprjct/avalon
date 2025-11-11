import express from 'express';
import dotenv from 'dotenv';
import healthRouter from './routes/health';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/health', healthRouter);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
