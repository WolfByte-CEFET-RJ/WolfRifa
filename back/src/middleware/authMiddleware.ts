import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getJwtSecret } from '../config/auth';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ message: 'Token não informado' });
    }

    const [esquema, token] = authorization.split(' ');

    if (esquema !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Token mal formatado' });
    }

    const secret = getJwtSecret(); 

    try {
        const payload = jwt.verify(token, secret, { algorithms: ['HS256'] }) as JwtPayload;

        req.user = { id: Number(payload.sub) };

        return next();
    } catch (err) {
        const message = err instanceof jwt.TokenExpiredError ? 'Token expirado' : 'Token inválido';
        return res.status(401).json({ message });
    }
}