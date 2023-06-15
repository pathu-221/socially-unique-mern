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
    const authorizationHeader = req.header('authorization');
    const token = authorizationHeader.split(' ')[1];

    if(!token){
        res.status(400).send({
            status: 0,
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
            status: 0,
            msg: 'Invalid token',
            err
        })
    }
}
