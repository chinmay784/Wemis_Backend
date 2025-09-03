const { cloudinary } = require("../config/cloudinary");
const ManuFactur = require("../models/ManuFacturModel");
const User = require("../models/UserModel");
const Wlp = require("../models/WlpModel");


exports.fetchWlpName = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({
                sucess: false,
                message: "User not authorized",
            })
        }

        // find in user collection
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                sucess: false,
                message: "User not found",
            })
        }

        // Find in Wlp collection
        const wlp = await Wlp.findOne({_id: user.wlpId});
        if (!wlp) {
            return res.status(404).json({
                sucess: false,
                message: "WLP not found",
            })
        }


        return res.status(200).json({
            sucess: true,
            message: "WLP name fetched successfully",
            wlpName: wlp.organizationName,
        });

    } catch (error) {
        console.log(error, error.message);
        res.status(500).json({
            sucess: false,
            message: "Failed to fetch WLP name",
        });
    }
}



exports.createManuFactur = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({
                sucess: false,
                message: "User not authorized",
            })
        }

        const { country, city, manufactur_code, business_Name, gst_Number, Parent_WLP, manufacturer_Name, mobile_Number, email, toll_Free_Number, website, address, logo } = req.body;

        if (!country || !city || !manufactur_code || !business_Name || !gst_Number || !Parent_WLP || !manufacturer_Name || !mobile_Number || !email || !toll_Free_Number || !website || !address) {
            return res.status(400).json({
                sucess: false,
                message: "All fields are required",
            })
        }

        const existingManuFactur = await ManuFactur.findOne({ email: email });

        if (existingManuFactur) {
            return res.status(409).json({
                sucess: false,
                message: "ManuFactur with this code already exists",
            })
        }


        // Ensure all files are uploaded
        const requiredFiles = ['logo'];
        for (let field of requiredFiles) {
            if (!req.files[field] || req.files[field].length === 0) {
                return res.status(400).json({
                    message: `${field} file is required`,
                    success: false
                });
            }
        };

        let gstCertUrl = null;

        if (req.files['logo']) {
            const file = req.files['logo'][0];
            const result = await cloudinary.uploader.upload(file.path, {
                folder: "profile_pics",
                resource_type: "raw"
            });
            gstCertUrl = result.secure_url;
        };



        const newManuFactur = new ManuFactur({
            wlpId: userId,
            country,
            city,
            manufactur_code,
            business_Name,
            gst_Number,
            Parent_WLP,
            manufacturer_Name,
            mobile_Number,
            email,
            toll_Free_Number,
            website,
            address,
            logo: gstCertUrl,
        });

        // Save email & password to user collection
        const mnfSaveInUser = new User({
            manufacturId: newManuFactur._id,
            email: email,
            password: mobile_Number, // Assuming mobileNumber is used as a password here, which is
            role: 'manufacture',
        })

        await mnfSaveInUser.save();

        await newManuFactur.save();

        res.status(201).json({
            sucess: true,
            message: "ManuFactur created successfully",
            data: newManuFactur
        })


    } catch (error) {
        console.log(error, error.message);
        res.status(500).json({
            sucess: false,
            message: "ManuFactur creation failed",
        })
    }
}