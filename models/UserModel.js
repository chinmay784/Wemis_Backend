const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    role:{
        type: String,
        enum: ['superadmin', 'admin', 'wlp' , 'manufacturer'],
    },
    adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('User', UserSchema);