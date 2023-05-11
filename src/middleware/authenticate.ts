import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface request extends Request {
    user: any
}

export const authenticate = (req: request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if(!token){
        res.send({
            msg: 'No token... Access Denied',
        })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.send({
            msg: 'invalid token',
            err
        })
    }
}
