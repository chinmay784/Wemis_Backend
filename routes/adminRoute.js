const express = require('express');
const router = express.Router();
const { authMiddelWere } = require("../middelwere/authMiddelWere");
const { createWlp, getAllWlp, deleteWlp, fetchAdminElementsList, adminDashBoard, adminAssignElement, fetchAllDaterelatedToassignAdminElement } = require('../controllers/adminController');
const { upload } = require('../config/cloudinary');

router.post("/createWlp", upload.fields([
    { name: 'logo', maxCount: 1 },
]), authMiddelWere, createWlp);
router.post("/getAllWlp",authMiddelWere, getAllWlp);
router.post("/deleteWlp",authMiddelWere, deleteWlp);
router.post("/fetchAdminElementsList",authMiddelWere, fetchAdminElementsList);
router.post("/adminDashBoard",authMiddelWere, adminDashBoard);
router.post("/fetchAllDaterelatedToassignAdminElement",authMiddelWere, fetchAllDaterelatedToassignAdminElement);
router.post("/adminAssignElement",authMiddelWere,adminAssignElement);

module.exports = router;