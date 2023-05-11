import { getDb } from "../db/conn";
import { Request, Response } from 'express';
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate, request } from "../middleware/authenticate";

const salts = 10;

const router = Router();

router.post('/login', async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;
        const db = await getDb();
        const user = await db.collection('users').findOne({ email });
        if(user){
            //match password
            const match = await bcrypt.compare(password, user.hashedPassword);
            if(!match){
                res.send({
                    msg: 'Incorrect Password',
                })
                return 
            } else {
                const token = jwt.sign({ user }, process.env.JWT_SECRET);
                res.send({
                    msg: 'logged in successfully',
                    access_token: token
                })
            }
        } else {
            res.send({
                msg: 'User doesnt exist',
            })
        }

    } catch (err) {
        console.error(err);
    }
});

router.get('/exp', authenticate, (req: request,res) => { res.send({msg: 'ok', user: req.user})})

router.post('/register',  async (req: Request, res: Response) => {

    const { email, password, displayName } = req.body;
    console.log({ email, password, displayName });
    try {
       // const { email, password, displayName } = req.body;

        const hashedPassword = await bcrypt.hash(password, salts);
        console.log({hashedPassword});
        const db = await getDb();

        const exists = await db.collection('users').findOne({ email });
        if(exists){
            res.send({
                msg: 'user already exists',

            })
            return
        }

        const ack = await db.collection('users').insertOne({ email, hashedPassword, displayName });
            res.send({
                msg: 'User registered successfully',
                ack,
        });        

    } catch (err) {
        console.error(err);
        res.send(err);
    }
})

export default router;