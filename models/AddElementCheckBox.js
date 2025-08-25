const mongoose = require("mongoose");


const AddElementCheckBox = new mongoose.Schema({
    elementModelId:{
        type:mongoose.Types.ObjectId,
        ref:"CreateElement",
    },
    checkBoxoxName:{
        type:String,
        trim:"true",
    }
});


module.exports = mongoose.model("AddElementCheckBox",AddElementCheckBox);