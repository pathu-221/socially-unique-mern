import dotenv from 'dotenv';

dotenv.config();

import express, { Request, Response} from 'express';
import cors from 'cors';


import auth from './routes/auth';
import posts from './routes/Posts';
import users from './routes/User';

import fileUpload from 'express-fileupload';
import { connect } from './db/conn';
import { v2 } from 'cloudinary';


export const app = express();


const port = process.env.PORT || 3000; 

app.use(cors({
    origin: "*",
    allowedHeaders: "*",
}))

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
    
})

app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}))

app.use('/auth', auth);
app.use('/posts', posts);
app.use('/user', users);


app.get('/', async (req:Request, res: Response) => {
    res.send(JSON.stringify({msg: 'ok'}))
})

app.listen(port, async () => {
    console.log(`app listening on port ${port}`)
    await connect();
})

console.log('changing hello after time');