const mongoose = require("mongoose");


const CreateElement = new mongoose.Schema({
    elementCategoryModelId: {
        type: mongoose.Types.ObjectId,
    },
    elementName: {
        type: String,
        trim:true,
    },
    is_Vltd: {
        type: Boolean,
        default: false,
    },
});


module.exports = mongoose.model("CreateElement",CreateElement);