import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: 'username'
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String,
    },
    photoUrl: {
        type: String,
    }
}, { timestamps: true });

export const User =  model('user', UserSchema);
