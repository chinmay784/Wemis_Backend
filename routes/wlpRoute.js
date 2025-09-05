const express = require('express');
const { createManuFactur, fetchWlpName, fetchManuFactur, deleteManuFactur, findManuFacturById, editManuFactur, findElements } = require('../controllers/wlpController');
const { authMiddelWere } = require('../middelwere/authMiddelWere');
const { upload } = require('../config/cloudinary');
const router = express.Router();

router.post("/createManuFactur", upload.fields([
    { name: 'logo', maxCount: 1 },
]), authMiddelWere, createManuFactur);

router.post("/fetchWlpName", authMiddelWere, fetchWlpName);
router.post("/fetchManuFactur", authMiddelWere, fetchManuFactur);
router.post("/deleteManuFactur", authMiddelWere, deleteManuFactur);
router.post("/findManuFacturById", authMiddelWere, findManuFacturById);
router.post("/editManuFactur", upload.fields([
    { name: 'logo', maxCount: 1 },
]), authMiddelWere, editManuFactur);
router.post("/findElements",authMiddelWere,findElements)

module.exports = router;