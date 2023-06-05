import { Request, Response } from 'express';
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate, IRequest } from "../middleware/authenticate";
import { CreateUserDto } from '../dto/Create-User.dto';
import { LoginDto } from '../dto/Login.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { User } from "../Models/User";
import { UploadApiResponse, v2 } from 'cloudinary';
import { ObjectId } from 'mongodb';

const salts = 10;

const router = Router();


router.post('/login', async (req: Request, res: Response) => {

    const loginDto = plainToClass(LoginDto, req.body);
    const errors = await validate(loginDto);

    if(errors.length) {
        const firstErrorMessage = Object.values(errors[0].constraints)[0];
        return res.status(401).json({ status: 0, msg: firstErrorMessage });
    }


    try {
        const user = await User.findOne({ email: loginDto.email });
        if(user){
            //match password
            const match = await bcrypt.compare(loginDto.password, user.password);
            if(!match){
                res.send({
                    status: 0,
                    msg: 'Incorrect Password',
                })
                return 
            } else {
                const token = jwt.sign({ user: { _id: user._id} }, process.env.JWT_SECRET);
                res.send({
                    status: 1,
                    msg: 'Logged in successfully!',
                    data: { access_token: token }
                })
            }
        } else {
            res.send({
                status: 0,
                msg: 'User doesnt exist',
            })
        }

    } catch (err) {

        console.error(err);
        res.send({ status: 0, msg: 'Something went wrong!'})
    }
});


router.get('/authenticate', authenticate, async (req: IRequest, res: Response) => {
    const user = await User.findOne({ _id: req.user._id });
    res.send({
        status: 1,
        msg: "Token Verified",
        data: user
    })
})

router.post('/register',  async (req: Request, res: Response) => {

    const createUserDto = plainToClass(CreateUserDto, req.body);
    const errors = await validate(createUserDto);

    if(errors.length) {
        const firstErrorMessage = Object.values(errors[0].constraints)[0];
        return res.status(401).json({ status: 0, msg: firstErrorMessage });
    }

    const id = new ObjectId();
    let imageUrl: string;

    if(req.files && req.files['photo']){
        //if multiple files check if they are array..

        const file = Array.isArray(req.files['photo']) ? req.files['photo'][0] : req.files['photo'];
            
        const image = await v2.uploader.upload(file.tempFilePath, {
            public_id: `userProfiles/${id}`,
        });

        imageUrl = image.url;
    }

    try {

        const hashedPassword = await bcrypt.hash(createUserDto.password, salts);
        createUserDto.password = hashedPassword;

        const exists = await User.findOne({ email: createUserDto.email });
        if(exists){
            res.send({
                status: 0,
                msg: 'User already exists!',
            })
            return
        }

        const newUser = new User({
            ...createUserDto,
            _id: id,
            photoUrl:  imageUrl || `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${createUserDto.email}`
        })

        await newUser.save();
        res.send({
            status: 1,
            msg: 'User registered successfully!',
            data: { user: newUser },
        });        

    } catch (err) {
        console.error(err);
        res.send({ status: 0, msg: 'Something went Wrong!' });
    }
})

export default router;