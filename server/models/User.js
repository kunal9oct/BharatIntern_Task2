import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        required: true,
    },
    avatarImgURL: {
        type: String,
        default: null,
    },
    profileImgURL: {
        type: String,
        default: null
    },
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
