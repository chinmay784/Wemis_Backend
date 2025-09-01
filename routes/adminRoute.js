const express = require('express');
const router = express.Router();
const { authMiddelWere } = require("../middelwere/authMiddelWere");
const { createWlp, getAllWlp } = require('../controllers/adminController');
const { upload } = require('../config/cloudinary');

router.post("/createWlp", upload.fields([
    { name: 'logo', maxCount: 1 },
]), authMiddelWere, createWlp);
router.post("/getAllWlp",authMiddelWere, getAllWlp);

module.exports = router;