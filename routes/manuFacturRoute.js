const express = require('express');
const { authMiddelWere } = require('../middelwere/authMiddelWere');
const { createDistributor ,fetchDistributor ,deleteDistributor, fetchDistributorById,editDistributor, createDelerUnderDistributor, fetchDelerDistributor, deleteDelerDistributor, createOem, fetchOems, deleteOems, getOemsById, editOemsById, createDelerUnderOems, fetchDelerUnderOems, deleteDelerUnderOems, getDelerUnderOemsById, editDelerOem, createBarCode, fetchAllAssignElementDataRelatedToCreateBarCode} = require('../controllers/manuFactrerController');
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
router.post("/deleteOems",authMiddelWere , deleteOems);
router.post("/getOemsById",authMiddelWere, getOemsById);
router.post("/editOemsById",authMiddelWere, editOemsById);
router.post("/createDelerUnderOems",authMiddelWere,createDelerUnderOems);
router.post("/fetchDelerUnderOems",authMiddelWere, fetchDelerUnderOems);
router.post("/deleteDelerUnderOems",authMiddelWere,deleteDelerUnderOems);
router.post("/getDelerUnderOemsById",authMiddelWere,getDelerUnderOemsById);
router.post("/editDelerOem",authMiddelWere,editDelerOem);
router.post("/createBarCode",authMiddelWere,createBarCode);
router.post("/fetchAllAssignElementDataRelatedToCreateBarCode",authMiddelWere,fetchAllAssignElementDataRelatedToCreateBarCode)


module.exports = router;