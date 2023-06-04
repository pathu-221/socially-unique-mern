import { Router, Response  } from "express";
import { IRequest, authenticate } from "../middleware/authenticate";
import { Username } from "../Models/Username";
import { User } from '../Models/User';
import { plainToClass } from "class-transformer";
import { CreateUsernameDto } from "../dto/Username.dto";
import { validate } from "class-validator";


const router = Router();

router.get('/username/:username', authenticate, async(req: IRequest, res: Response) => {
    const createUsernameDto = plainToClass(CreateUsernameDto, req.params);
    const errors = await validate(createUsernameDto);

    if(errors.length) {
        const firstErrorMessage = Object.values(errors[0].constraints)[0];
        return res.status(401).json({ status: 0, msg: firstErrorMessage });
    }

    try {

        const username = await Username.findOne({ username: createUsernameDto.username });

        if(username) {
            return res.send({ status: 0, msg: "Username Taken!", data: { available: false }})
        } else {
            return res.send({ status: 1, msg: "Username Available", data: { available: true }})
        }

    } catch (err) {
        console.error({ err });
        res.send({
            status: 1,
            msg: "Something Went Wrong!",
        })
    }
})

router.post('/username', authenticate, async(req: IRequest, res: Response) => {
    const createUsernameDto = plainToClass(CreateUsernameDto, req.body);
    const errors = await validate(createUsernameDto);

    if(errors.length) {
        const firstErrorMessage = Object.values(errors[0].constraints)[0];
        return res.status(401).json({ status: 0, msg: firstErrorMessage });
    }

    try {

        const username = await Username.findOne({ username: createUsernameDto.username });

        if(username) {
            return res.send({ status: 0, msg: "Username Taken!", data: username })
        } else {

            const newUsername = new Username({ username: createUsernameDto.username});
            await newUsername.save();
            await User.updateOne({_id: req.user._id }, { usernameText: newUsername.usernameText })

            return res.send({ status: 1, msg: "Username Saved!", data: newUsername })
        }


    } catch (err) {
        console.error({ err });
        res.send({ 
            status: 0,
            msg: "Something went wrong",
        })
    }
})

export default router;