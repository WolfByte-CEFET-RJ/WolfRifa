import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/usersRoutes.js';
import authRoutes from './routes/authRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';

const app: express.Express = express();

app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(campaignRoutes);

async function startServer(): Promise<void> {
    


    const PORT: number = process.env.PORT ? Number(process.env.PORT) : 5000;
    const HOST: string = process.env.HOST || "0.0.0.0";
    app.listen(PORT, HOST, async () => {
    console.log(` \tServidor ativo em: http://localhost:${PORT}`);
    console.log(` \tExecutando em: ${process.env.NODE_ENV}`)
    
    });
}

startServer();