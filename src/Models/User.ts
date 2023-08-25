import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    usernameId: {
        type: Schema.Types.ObjectId,
        ref: 'username'
    },
    username: {
        type: String,
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