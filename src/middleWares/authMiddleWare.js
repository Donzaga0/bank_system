const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')

const checkAdmin = async (req, res, next) => {

    const token = req.cookies.jwt;

    if (!token || token === undefined) {
        return res.redirect('/auth/login');    
    }         

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (error, decodedToken) => {
            if (error) {
                if (error.message === 'jwt expired') {
                    return res.redirect('/auth/login');
                }
                return res.redirect('/auth/login');
            } else {
                const admin = await Admin.findOne({ _id: decodedToken.id }, { password: 0 })
                console.log(admin);
                 
                if (admin) {
                    req.admin = decodedToken.id;
                    res.locals._admin = admin;
                    next();
                } else {
                    res.locals.user = null; // Fix the typo here
                    return res.redirect('/auth/login');
                }
            }
        });
    } else {
        return res.redirect('/auth/login');
    }
}

module.exports = { checkAdmin };