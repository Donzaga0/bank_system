const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const adminSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcryptjs.genSalt(10);

        this.password = await bcryptjs.hash(this.password, salt);
    }

    next();
})

adminSchema.statics.login =  async function(email, password) {
    console.log(email, password);
    
    const admin = await this.findOne({email});

    if (admin) {
        // cpmpare pasword
        const auth  =  await bcryptjs.compare(password, admin.password)
        console.log(auth);

        if (auth) {
            return admin;
        }
        throw new Error('Incorrect Email or Password')

    }
    throw new Error('Admin Not Found')
}

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;