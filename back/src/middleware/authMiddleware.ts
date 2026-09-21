import type { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import "dotenv/config";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
            };
        }
    }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
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

        req.user = { id: Number(payload.sub) };

        return next();
    } catch (err) {
        const message = err instanceof jwt.TokenExpiredError ? 'Token expirado' : 'Token inválido';
        return res.status(401).json({ message });
    }
}