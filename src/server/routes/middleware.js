import jwt from 'jsonwebtoken';

export const getUser = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) req.user = jwt.verify(token, process.env.SECRET);  
    next();  
}