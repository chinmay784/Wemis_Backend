const mongoose = require("mongoose");



const createDelerUnderOems = new mongoose.Schema({
    manufacturId: {
        type: mongoose.Types.ObjectId,
        ref: "ManuFactur"
    },
    oemsId: {
        type: mongoose.Types.ObjectId,
        ref: "OemModelSchema"
    },
    select_Oems_Name: {
        type: String,
        trim: true,
    },
    business_Name: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        trim: true,
    },
    mobile: {
        type: String,
        trim: true,
    },
    date_of_birth: {
        type: String,
        trim: true,
    },
    age: {
        type: String,
        trim: true,
    },
    Is_Map_Device_Edit: {
        type: Boolean,
        default: false,
    },
    pan_Number: {
        type: String,
        trim: true,
    },
    occupation: {
        type: String,
        trim: true,
    },
    Advance_Payment: {
        type: Number,
        default: 0
    },
    languages_Known: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    district: {
        type: String,
        trim: true,
    },
    RTO_Division: {
        type: String,
        trim: true,
    },
    Pin_Code: {
        type: String,
        trim: true,
    },
    area: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    }
});


module.exports = mongoose.model("createDelerUnderOems", createDelerUnderOems)