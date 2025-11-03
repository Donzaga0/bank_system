const Admin = require('../models/admin');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    getAdminLoginPage: async (req, res) => {
        try {

            return res.render('./auth/login.ejs')

        } catch (error) {
            return res.status(500).json({ message: 'Server Error' });
        }
    },

    registerAdmin: async (req, res) => {
        const { fname, lname, email, phone, password, } = req.body
        // console.log(req.body);

        try {
            const fnamePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,30}$/;
            const lnamePatern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,30}$/;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phonePattern = /^\d{10,15}$/;
            const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

            if (!fnamePattern.test(fname)) {
                throw Error('Please Enter Your Fillname')
            }

            if (!lnamePatern.test(lname)) {
                throw Error('Please Enter Your Username')
            }

            if (!emailPattern.test(email)) {
                throw Error('Please Enter Your Email')
            }

            if (!phonePattern.test(phone)) {
                throw Error('Please Enter Your Email')
            }

            if (!passwordPattern.test(password)) {
                throw Error('Please Enter Password')
            }


            const data = { fname, lname, email, phone, password, }
            const hashedPassword = await bcryptjs.hash(password, 10)
            data.password = hashedPassword
            console.log(data);

            const newAdmin = await Admin.create({ fname, lname, email, phone, password, })
            // console.log(newAdmin);

            return res.status(200).json({
                success: true,
                msg: 'Registration Successful',
                redirectUrl: '/login',
                data: newAdmin
            })

        } catch (error) {
            console.log(error);
            return res.status(502).json({ error: error.message })
        }
    },

    loginAdmin: async (req, res) => {

        const { email, password } = req.body;

        try {

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

            if (!emailPattern.test(email)) {
                throw Error('invalid name first name')
            }
            if (!passwordPattern.test(password)) {
                throw Error('invalid name first name')
            }

            const _admin = await Admin.login(email, password)
            console.log(_admin);

            // generate jsonwebtoken
            const token = jwt.sign({ id: _admin._id },
                process.env.JWT_SECRET,
                { expiresIn: 1000 * 60 * 60 * 24 }
            )
            console.log(token);

            res.cookie('jwt', token, {
                maxAge: 4000 * 60 * 60,
            });

            return res.status(200).json({
                success: true,
                msg: 'Login Successful!!!',
                data: _admin,
                redirectURL: '/admin/dashboard'
            });


        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message })
        }
    },
}