import dotenv from 'dotenv';

dotenv.config();

import express, { Request, Response} from 'express';
import cors from 'cors';
import  user from './db/username';
import auth from './routes/user';

import { getDb } from './db/conn';

export const app = express();


const port = process.env.PORT || 3000; 

app.use(cors({
    origin: "*"
}))

app.use(express.json())

app.use('/user', auth);

app.get('/', async (req:Request, res: Response) => {
    res.send(JSON.stringify({msg: 'ok'}))
})

app.listen(port, async () => {
    console.log(`app listening on port ${port}`)
    await getDb();
})

console.log('changing hello after time');