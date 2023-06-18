import { Schema, model } from "mongoose";


const LikesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
})

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    text: {
        required: true,
        type: String,
    },
    parentComment: {
        type: Schema.Types.ObjectId,
    }
}, {
    timestamps: true
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
    likes: [LikesSchema],
    comments: [CommentSchema]

}, { timestamps: true });

export const Posts = model('Posts', PostsSchema);