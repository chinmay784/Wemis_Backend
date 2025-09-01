const express = require('express');
const router = express.Router();
const { authMiddelWere } = require("../middelwere/authMiddelWere");
const { createWlp, getAllWlp, deleteWlp, fetchAdminElementsList } = require('../controllers/adminController');
const { upload } = require('../config/cloudinary');

router.post("/createWlp", upload.fields([
    { name: 'logo', maxCount: 1 },
]), authMiddelWere, createWlp);
router.post("/getAllWlp",authMiddelWere, getAllWlp);
router.post("/deleteWlp",authMiddelWere, deleteWlp);
router.post("/fetchAdminElementsList",authMiddelWere, fetchAdminElementsList)

module.exports = router;