import type { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import "dotenv/config";
import { retornaID } from '../utils/RetornaID.js';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
            };
        }
    }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ message: 'Token não informado' });
    }

    const [esquema, token] = authorization.split(' ');

    if (esquema !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Token mal formatado' });
    }

    const secret = process.env.JWT_SECRET;

    let payload: JwtPayload;
    try {
        payload = jwt.verify(token, String(secret), { algorithms: ['HS256'] }) as JwtPayload;
    } catch (err) {
        const message = err instanceof jwt.TokenExpiredError ? 'Token expirado' : 'Token inválido';
        return res.status(401).json({ message });
    }

    // o sub do token é o public_id (uuid) do usuário; converte para o id interno usado nas FKs
    try {
        const id = payload.sub ? await retornaID('users', payload.sub) : null;

        if (id === null) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.user = { id: Number(id) };

        return next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}