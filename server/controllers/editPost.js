import Post from '../models/Post.js';

export const editPost = async (req, res, next) => {
    if (req.body.userId === req.user.id) {
        try {
            if (req.file) {
                req.body = { ...req.body, ['image']: req.file.filename }
            }

            await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

            res.status(200).json({ success: true });
        } catch (error) {
            next(error);
        }
    } else {
        return res.status(403).json({
            success: false,
            status: 403,
            message: "You can only Edit only your post!",
        })
    }
}
