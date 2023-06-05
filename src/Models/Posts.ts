import { Schema, model } from "mongoose";


const LikesSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
})

const PostsSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    content: {
        requred: true,
        type: String
    },
    picture: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    likes:[ LikesSchema ]

}, { timestamps: true });

export const Posts = model('Posts', PostsSchema);