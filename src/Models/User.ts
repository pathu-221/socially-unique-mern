import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String,
    },
    displayName: {
        required: true,
        type: String
    },
    photoURL: {
        type: String,
    }
}, { timestamps: true });

export const User =  model('user', UserSchema);
