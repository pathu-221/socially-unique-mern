import { Router, Request, Response } from "express";
import { Posts } from "../Models/Posts";
import { IRequest, authenticate } from "../middleware/authenticate";
import { plainToClass } from "class-transformer";
import { CreatePostsDto } from "../dto/create-posts.dto";
import { validate } from "class-validator";
import { v2 } from 'cloudinary';


const router = Router();


router.get('/', async (req: Request, res: Response) => {

    try {
        const posts = await Posts.find({ published: true }).populate("user", "username photoUrl");

        res.send({
            status: 1,
            msg: "All Posts fetched successfully!",
            data: posts
        })

    } catch (error) {
        console.error(error);
        res.send({ status: 0, msg: "Something went wrong!" })
    }
})

router.post('/', authenticate, async (req: IRequest, res: Response) => {
    const createPostsDto = plainToClass(CreatePostsDto, req.body);
    const errors = await validate(createPostsDto);

    if (errors.length) {
        const firstErrorMessage = Object.values(errors[0].constraints)[0];
        return res.status(401).json({ status: 0, msg: firstErrorMessage });
    }

    try {

        let url;

        if (req.files) {
            const image = await v2.uploader.upload(req.files.image.tempFilePath, {
                public_id: `${req.user._id}/${req.files.image.name}`
            });
            url = image.url;
        }

        const post = new Posts({
            ...createPostsDto,
            picture: url,
            user: req.user._id
        });
        await post.save();

        res.send({
            status: 1,
            msg: 'Post saved successfully!',
            data: post
        })


    } catch (err) {
        console.error({ err });
        res.status(501).send({
            status: 0,
            msg: "Something went wrong!",
        })
    }
})





router.get('/:id', async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const posts = await Posts.find({ user: id }).populate("user", "username photoUrl");
        res.status(200).send({
            status: 1,
            msg: "Users posts fetched!",
            data: posts
        })
    } catch (error) {
        console.error(error);
        res.end({
            status: 0,
            msg: "Something went wrong!"
        })
    }

})

export default router;