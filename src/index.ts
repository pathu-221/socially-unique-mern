import express, { Request, Response} from 'express';
import { auth } from 'express-openid-connect';

import loginRouter from './auth/login';

export const app = express();


const port = process.env.PORT || 3000; 


const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: 'http://localhost:3000',
    clientID: 'orOyhWBXxDG7qTWCoioD20WUd4IdTaoI',
    issuerBaseURL: 'https://dev-l1w6f4a5siq1k5px.us.auth0.com',
    secret: '4aHq5IJJGi-lWVX-kydD9Gqci4PEJzlcRKAz3j5AqcaV_EtzQF4Bbbvad_r5Oq-a'
};

app.use(auth(config));
app.use(loginRouter)


app.get('/', (req, res) => {
    res.send('ok')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

console.log('changing hello after time');