const express = require('express');
const { authMiddelWere } = require('../middelwere/authMiddelWere');
const { createDistributor } = require('../controllers/manuFactrerController');
const router = express.Router();

router.post("/createDistributor",authMiddelWere,createDistributor)


module.exports = router;