import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload'

export interface IRequest extends Request {
    user:  { _id: string },
    files?: {
        [ key: string]: UploadedFile
    }
}

export const authenticate = (req: IRequest, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(400).send({
            msg: 'No token... Access Denied',
        })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).send({
            msg: 'invalid token',
            err
        })
    }
}
