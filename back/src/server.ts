import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app: express.Express = express();

app.use(cors());
app.use(express.json());

async function startServer(): Promise<void> {
    


    const PORT: number = process.env.PORT ? Number(process.env.PORT) : 5000;
    const HOST: string = process.env.HOST || "0.0.0.0";
    app.listen(PORT, HOST, async () => {
    console.log(` \tServidor ativo em: http://localhost:${PORT}`);
    console.log(` \tExecutando em: ${process.env.NODE_ENV}`)
    
    });
}

startServer();