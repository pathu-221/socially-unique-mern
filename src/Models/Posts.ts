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
        type: String
    },
    picture: {
        type: String
    },
    published:{
        required: true,
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    likes:[ LikesSchema ]

}, { timestamps: true });

export const Posts = model('Posts', PostsSchema);