import { Request, Response } from 'express';
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate, request } from "../middleware/authenticate";
import { CreateUserDto } from '../dto/Create-User.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { User } from "../Models/User";

const salts = 10;

const router = Router();


router.post('/login', async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(user){
            //match password
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                res.send({
                    msg: 'Incorrect Password',
                })
                return 
            } else {
                const token = jwt.sign({ user }, process.env.JWT_SECRET);
                res.send({
                    msg: 'logged in successfully',
                    access_token: token
                })
            }
        } else {
            res.send({
                msg: 'User doesnt exist',
            })
        }

    } catch (err) {

        console.error(err);
    }
});

router.post('/register',  async (req: Request, res: Response) => {

    const createUserDto = plainToClass(CreateUserDto, req.body);
    const errors = await validate(createUserDto);

    if(errors.length) return res.status(401).json(errors);

    try {

        const hashedPassword = await bcrypt.hash(createUserDto.password, salts);
        createUserDto.password = hashedPassword;

        const exists = await User.findOne({ email: createUserDto.email });
        if(exists){
            res.send({
                msg: 'user already exists',
            })
            return
        }

        const newUser = new User({
            ...createUserDto,
            photoURL: createUserDto.photoURL || `https://api.dicebear.com/6.x/initials/svg?seed=${createUserDto.displayName}`
        })

        await newUser.save();
        res.send({
            msg: 'User registered successfully',
            newUser,
        });        

    } catch (err) {
        console.error(err);
        res.send(err);
    }
})

export default router;