import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatarImgURL: {
        type: String,
        default: null
    },
    profileImgURL: {
        type: String,
        default: null
    },
    location: {
        type: String,
        default: null
    },
    tags: {
        type: String,
        default: null
    },
    rteText: {
        type: String,
        default: null
    },
    title: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);
