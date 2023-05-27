import { Router, Request, Response } from "express";
import { Posts } from "../Models/Posts";
import { IRequest, authenticate } from "../middleware/authenticate";
import { plainToClass } from "class-transformer";
import { CreatePostsDto } from "../dto/Create-Posts.dto";
import { validate } from "class-validator";
import { v2 } from 'cloudinary';


const router = Router(); 


router.get('/', async (req:Request, res: Response) => {
    const posts = await Posts.find({}).populate("user", "displayName photoUrl");

    res.send({
        msg: "All Posts fetched successfully",
        data: posts
    })
})

router.post('/create', authenticate, async (req: IRequest, res: Response) => {
    const createPostsDto = plainToClass(CreatePostsDto, req.body);
    const errors = await validate(createPostsDto);

    if(errors.length) return res.send({ msg: "There is some error", errors})

    try {

        let url;
        if(req.files){
            const image = await v2.uploader.upload(req.files.image.tempFilePath, {
                public_id: `${req.user._id}/${req.files.image.name}`
            });
            url = image.url;
        }

        const post = new Posts({
            ...createPostsDto,
            picture: url,
            userId: req.user._id
        });
        await post.save();

        res.send({
            msg: 'Post saved successfullt',
            data: post
        })


    } catch ( err ) {
        console.error({ err });
        res.status(501).send({
            msg:"Something went wrong",
            err
        })
    }
})

router.get('/usersPosts', authenticate, async (req: IRequest, res: Response) => {

    const posts = await Posts.find({ userId: req.user._id  });
    res.status(200).send(JSON.stringify({
        msg: "Users posts fetched",
        data: posts
    }))

})

export default router;