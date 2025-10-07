const mongoose = require('mongoose');


const RollBackAlloCatedBarCodeSchema = new mongoose.Schema({
    state:{
        type:String,
        trim:true,
    },
    distributor:{
        type:String,
        trim:true,
    },
    
});

module.exports = mongoose.model('RollBackAlloCatedBarCodeSchema', RollBackAlloCatedBarCodeSchema);