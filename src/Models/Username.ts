import { model, Schema } from 'mongoose';

const UsernameSchema = new Schema({
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    username: {
        type: String,
        required: true,
    }
})

export const Username = model("username", UsernameSchema);