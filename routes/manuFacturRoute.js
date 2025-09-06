const express = require('express');
const { authMiddelWere } = require('../middelwere/authMiddelWere');
const { createDistributor } = require('../controllers/manuFactrerController');
const { upload } = require('../config/cloudinary');
const router = express.Router();

router.post("/createDistributor",upload.none(),authMiddelWere,createDistributor)


module.exports = router;