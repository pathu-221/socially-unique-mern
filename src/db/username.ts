import expres from 'express';

const router = expres.Router(); 

router.get('/username', (req, res) => {
    res.send('ok ur using username');
})

export default router;