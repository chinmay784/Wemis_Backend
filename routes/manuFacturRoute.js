const express = require('express');
const { authMiddelWere } = require('../middelwere/authMiddelWere');
const { createDistributor ,fetchDistributor ,deleteDistributor, fetchDistributorById,editDistributor} = require('../controllers/manuFactrerController');
const { upload } = require('../config/cloudinary');
const router = express.Router();

router.post("/createDistributor",upload.none(),authMiddelWere,createDistributor);
router.post("/fetchDistributor",authMiddelWere,fetchDistributor);
router.post("/deleteDistributor",authMiddelWere,deleteDistributor);
router.post("/fetchDistributorById",authMiddelWere,fetchDistributorById);
router.post("/editDistributor",authMiddelWere,editDistributor)


module.exports = router;