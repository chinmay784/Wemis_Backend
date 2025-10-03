const mongoose = require('mongoose');


const allocateBarCodeSchema = new mongoose.Schema({
    country: { type: String, trim: true },
    state: { type: String, trim: true },
    checkBoxValue: { type: String },
    // distributor: { type: String, trim: true },
    // oem: { type: String, trim: true },
    // deler: { type: String, trim: true },
    element: { type: String, trim: true },
    elementType: { type: String, trim: true },
    modelNo: { type: String, trim: true },
    Voltege: { type: String, trim: true },
    partNo: { type: String, trim: true },
    type: { type: String, trim: true },
    avaliableBarCode: [
        {
            type: String,
            trim: true,
        }
    ],
    allocatedBarCode: [
        {
            type: String,
            trim: true,
        }
    ],
    status: { type: String, trim: true, default: 'used' },
    createdAt: { type: Date, default: Date.now },
    manufacturAllocateId: { type: mongoose.Schema.Types.ObjectId, ref: 'ManuFactur' },
    allocatedDistributorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Distributor' },
    allocatedOemId: { type: mongoose.Schema.Types.ObjectId, ref: 'OemModelSchema' },
    allocatedDelerId: { type: mongoose.Schema.Types.ObjectId },

});
module.exports = mongoose.model('AllocateBarCode', allocateBarCodeSchema);