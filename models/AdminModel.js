const mongoose = require('mongoose');


const AdminSchema = new mongoose.Schema({
    superAdminId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name_of_business: {
        type: String,
    },
    Regd_Address: {
        type: String,
    },
    Gstin_No: {
        type: String,
    },
    Pan_no: {
        type: String,
    },
    Name_of_Business_owner: {
        type: String,
    },
    Email: {
        type: String,
        unique: true
    },
    Contact_No: {
        type: String,
    },
    GST_Certificate:{
        type:String,
    },
    Pan_Card:{
        type:String,
    },
    Incorporation_Certificate:{
        type:String,
    },
    Company_Logo:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Admin" , AdminSchema)