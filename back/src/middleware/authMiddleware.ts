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

    try {
        const payload = jwt.verify(token, String(secret), { algorithms: ['HS256'] }) as JwtPayload;

        let userId = Number(payload.id ?? payload.sub);

        // Se o sub for um UUID (string), busca o id numérico correspondente no banco via retornaID
        if (isNaN(userId)) {
            const idEncontrado = await retornaID('users', String(payload.sub));
            userId = idEncontrado ? Number(idEncontrado) : NaN;
        }

        req.user = { id: userId };

        return next();
    } catch (err) {
        const message = err instanceof jwt.TokenExpiredError ? 'Token expirado' : 'Token inválido';
        return res.status(401).json({ message });
    }
}