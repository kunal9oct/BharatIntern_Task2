import express from 'express';
import multer from 'multer';
import { update } from '../controllers/editProfile.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/images/");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
    },
});

const imageUpload = multer({ storage: storage });

router.put('/:id', verifyToken, imageUpload.single('image'), update);

export default router;
