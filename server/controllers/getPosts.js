import Post from "../models/Post.js";

export const getPosts = async (req, res, next) => {
    const userId = req.params.id;

    try {
        let all = await Post.find({userId}, { "name": 1, "rteText": 1, "title": 1, "image": 1, "userId": 1, "avatarImgURL": 1, "profileImgURL": 1, "location": 1, "createdAt": 1, "_id": 1 }).sort({ createdAt: -1 });

        if(all.length < 1) {
            all = null;
        }
        res.status(200).json({ success: true, all: all });
    } catch (error) {
        next(error);
    }
}
