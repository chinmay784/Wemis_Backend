const express = require('express');
const { registerSuperAdmin, login, getProfile, createAdmin, getAllAdmins, deleteAdmin, editAdmin, getAdminById, fetchAllAdmins_Elements_wlp, createBrand, fetchAllBrands, createElementCategory, fetchAllCategory, createElement, addElementCheckBox } = require('../controllers/superAdminController');
const { authMiddelWere } = require('../middelwere/authMiddelWere');
const { upload } = require('../config/cloudinary');
const router = express.Router();

router.post("/register-superadmin", registerSuperAdmin);
router.post('/login', login);
router.post('/profile', authMiddelWere, getProfile);
router.post(
    '/createAdmin',
    authMiddelWere,
    upload.fields([
        { name: 'Company_Logo', maxCount: 1 },
        { name: 'Incorporation_Certificate', maxCount: 1 },
        { name: 'Pan_Card', maxCount: 1 },
        { name: 'GST_Certificate', maxCount: 1 }
    ]),
    createAdmin
);

router.post('/getAllAdmins', authMiddelWere, getAllAdmins);
router.post('/getAdminById', authMiddelWere , getAdminById)
router.post(
  '/editAdmin',
  authMiddelWere,
  upload.fields([
    { name: 'Company_Logo', maxCount: 1 },
    { name: 'Incorporation_Certificate', maxCount: 1 },
    { name: 'Pan_Card', maxCount: 1 },
    { name: 'GST_Certificate', maxCount: 1 }
  ]),
  editAdmin
);

router.post("/deleteAdmin", authMiddelWere, deleteAdmin);
router.post('/fetchAllAdmins_Elements_wlp', authMiddelWere, fetchAllAdmins_Elements_wlp)
router.post("/createBrand",authMiddelWere, createBrand);
router.post("/fetchAllBrands", authMiddelWere, fetchAllBrands);
router.post("/createElementCategory", authMiddelWere, createElementCategory);
router.post("/fetchAllCategory",authMiddelWere,fetchAllCategory);
router.post("/createElement",authMiddelWere,createElement);
router.post("/addElementCheckBox",authMiddelWere,addElementCheckBox);


module.exports = router;