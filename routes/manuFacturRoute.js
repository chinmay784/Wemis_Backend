const express = require('express');
const { authMiddelWere } = require('../middelwere/authMiddelWere');
const { createDistributor ,fetchDistributor ,deletedistributor} = require('../controllers/manuFactrerController');
const { upload } = require('../config/cloudinary');
const router = express.Router();

router.post("/createDistributor",upload.none(),authMiddelWere,createDistributor);
router.post("/fetchDistributor",authMiddelWere,fetchDistributor);
router.post("/deleteDistributor",authMiddelWere,deletedistributor)


module.exports = router;