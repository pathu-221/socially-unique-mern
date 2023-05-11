import expres from 'express';
import { getDb } from './conn';
const router = expres.Router(); 

type reqType = {
    username: string,
}

router.get('/username/:username', async (req, res) => {
    try {
  
        const { username }: reqType = req.params;

        const db = await getDb();
        const doc = await db.collection('usernames').findOne({ username: username });
        console.log({ doc, username });

        if (!doc) {
            res
            .status(200)
            .send(JSON.stringify({ msg: 'username available', available: true, username }))
        } 
        else 
        res
        .status(200)
        .send(JSON.stringify({ msg: 'username not available', available: false }))

    } catch (err) {
        console.log({ err });
        res.status(501).send(JSON.stringify({ msg: 'There was some error' }));
    }

})

export default router;