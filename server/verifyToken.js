import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if(!token) return res.status(401).json({
        success: false,
        status: 401,
        message: "You are not authenticated!",
    })

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({
            success: false,
            status: 403,
            message: "Token is not valid!",
        })

        req.user = user;
        next();
    });
}
