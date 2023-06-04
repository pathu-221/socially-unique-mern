import { model, Schema } from 'mongoose';

const UsernameSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    usernameText: {
        type: String,
        required: true,
    }
})

export const Username = model("username", UsernameSchema);