import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
    // const token = req.cookies.access_token;
    
    // console.log(req);

    if (!token) {
        return next(createError(401, "You're not authenticated!"));
    }
    jwt.verify(token, 'abcdefghi1234543321', (err, user) => {
        if(err)
            return next(createError(401, "Token is not valid!"));
        req.user = user;
        next();
    });
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            return next(createError(403, 'You are not authorized!'));
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        console.log(req.user);
        if(req.user.isAdmin) {
            console.log('Yes');
            next();
        }
        else {
            console.log('No');
            return next(createError(403, 'You are not authorized!'));
        }
    })
}