import dotenv from 'dotenv';
import express, { Request, Response} from 'express';
import cors from 'cors';
import  user from './db/username';

dotenv.config();

import { getDb } from './db/conn';

export const app = express();



const port = process.env.PORT || 3000; 

app.use(cors({
    origin: "*"
}))
app.use('/user', user);

app.get('/', async (req, res) => {
    res.send(JSON.stringify({msg: 'ok'}))
})

app.listen(port, async () => {
    console.log(`app listening on port ${port}`)
    await getDb();
})

console.log('changing hello after time');