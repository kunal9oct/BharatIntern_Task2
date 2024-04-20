import Post from '../models/Post.js';

export const post = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            if (req.file) {
                req.body = { ...req.body, ['image']: req.file.filename }
            }

            const newPost = new Post(req.body);
            await newPost.save();
            
            res.status(200).json({ success: true });
        } catch (error) {
            next(error);
        }
    } else {
        return res.status(403).json({
            success: false,
            status: 403,
            message: "You can only Create post from own account!",
        })
    }
}
