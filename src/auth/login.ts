import express, { Request, Response} from 'express';
import { requiresAuth } from 'express-openid-connect';
import { json } from 'stream/consumers';


const router = express.Router();

//login logout and callback are handled by aut 0

router.get('/profile', requiresAuth(), (req, res) => {
    console.log({user: req.oidc.user})
    res.send('pk');
})


export default router;