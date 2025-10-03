const mongoose = require("mongoose");



const OemModelSchema = new mongoose.Schema({
    manufacturId: {
        type: mongoose.Types.ObjectId,
        ref: "ManuFactur"
    },
    business_Name: {
        type: String,
        trim: true,
    },
    contact_Person_Name: {
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
    date_of_Birth: {
        type: String,
        trim: true,
    },
    age: {
        type: String,
        trim: true,
    },
    Map_Device_Edit: {
        type: Boolean,
        default: false,
    },
    pAN_Number: {
        type: String,
        trim: true,
    },
    occupation: {
        type: String,
        trim: true,
    },
    gst_no: {
        type: String,
        trim: true,
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
    address: {
        type: String,
        trim: true,
    },
    allocateBarcodes: [
        {
            type: String,
            trim: true,
        }
    ]
});


module.exports = mongoose.model("OemModelSchema", OemModelSchema);