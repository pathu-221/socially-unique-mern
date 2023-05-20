import { Router, Response  } from "express";
import { IRequest, authenticate } from "../middleware/authenticate";
import { Username } from "../Models/Username";
import { User } from '../Models/User';
import { plainToClass } from "class-transformer";
import { CreateUsernameDto } from "../dto/Username.dto";
import { validate } from "class-validator";


const router = Router();

router.get('/username', authenticate, async(req: IRequest, res: Response) => {
    const createUsernameDto = plainToClass(CreateUsernameDto, req.body);
    const errors = await validate(createUsernameDto);

    if(errors.length) return res.send({ msg:"Something Went Wrong", err: errors})

    try {

        const username = await Username.findOne({ username: createUsernameDto.username });
        if(username) {
            return res.send({ msg: "Username Taken!", data: username })
        } else {
            return res.send({ msg: "Username Available", data: username })
        }

    } catch (err) {
        console.error({ err });
        res.send({
            msg: "Something Went Wrong!",
            err
        })
    }
})

router.post('/username', authenticate, async(req: IRequest, res: Response) => {
    const createUsernameDto = plainToClass(CreateUsernameDto, req.body);
    const errors = await validate(createUsernameDto);

    if(errors.length) return res.send({ msg:"Something Went Wrong", err: errors})

    try {

        const username = await Username.findOne({ username: createUsernameDto.username });
        if(username) {
            return res.send({ msg: "Username Taken!", data: username })
        } else {

            const newUsername = new Username({ username: createUsernameDto.username});
            await newUsername.save();
            await User.updateOne({_id: req.user._id }, { username: newUsername.username})

            return res.send({ msg: "Username Saved!", data: newUsername })
        }


    } catch (err) {
        console.error({ err });
        res.send({ 
            msg: "Something went wrong",
            err
        })
    }
})

export default router;