const express = require('express');
const { authMiddelWere } = require('../middelwere/authMiddelWere');
const { createDistributor ,fetchDistributor ,deleteDistributor, fetchDistributorById,editDistributor, createDelerUnderDistributor, fetchDelerDistributor, deleteDelerDistributor, createOem, fetchOems, deleteOems} = require('../controllers/manuFactrerController');
const { upload } = require('../config/cloudinary');
const router = express.Router();

router.post("/createDistributor",upload.none(),authMiddelWere,createDistributor);
router.post("/fetchDistributor",authMiddelWere,fetchDistributor);
router.post("/deleteDistributor",authMiddelWere,deleteDistributor);
router.post("/fetchDistributorById",authMiddelWere,fetchDistributorById);
router.post("/editDistributor",authMiddelWere,editDistributor);
router.post("/createDelerUnderDistributor",authMiddelWere,createDelerUnderDistributor)
router.post("/fetchDelerDistributor",authMiddelWere,fetchDelerDistributor);
router.post("/deleteDelerDistributor",authMiddelWere,deleteDelerDistributor);
router.post("/createOem",authMiddelWere,createOem);
router.post("/fetchOems",authMiddelWere, fetchOems);
router.post("/deleteOems",authMiddelWere , deleteOems)


module.exports = router;