const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin', 'wlp', 'manufacturer','distibutor','oem','deler'],
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    wlpId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wlp',
    },
    manufacturId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ManuFactur',
    },
    distributorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Distributor',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('User', UserSchema);