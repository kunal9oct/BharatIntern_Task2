import express from 'express';
import multer from 'multer';
import { editPost } from '../controllers/editPost.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
    },
});

const imageUpload = multer({ storage: storage });

router.post('/:id', verifyToken, imageUpload.single('image'), editPost);

export default router;
