const Wlp = require("../models/WlpModel");
const User = require("../models/UserModel");
const { cloudinary } = require("../config/cloudinary");


exports.createWlp = async (req, res) => {
    try {
        const userId = req.user.userId;
        if (!userId) {
            return res.status(401).json({
                sucess: false,
                message: "Unauthorized User"
            })
        }

        const { country, state, defaultLanguage, organizationName, mobileNumber, salesMobileNumber, landLineNumber, email, appPackage, showPoweredBy, accountLimit, smsGatewayUrl, smsGatewayMethod, gstinNumber, billingEmail, websiteUrl, logo, address } = req.body;

        if (!country || !state || !defaultLanguage || !organizationName || !mobileNumber || !salesMobileNumber || !landLineNumber || !email || !appPackage || !showPoweredBy || !accountLimit || !smsGatewayUrl || !smsGatewayMethod || !gstinNumber || !billingEmail || !websiteUrl || !address) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide All Details"
            })
        };


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


        // Create wlp document in DB
        const wlp = new Wlp({
            adminId: userId,
            country,
            state,
            defaultLanguage,
            organizationName,
            mobileNumber,
            salesMobileNumber,
            landLineNumber,
            email,
            appPackage,
            showPoweredBy,
            accountLimit,
            smsGatewayUrl,
            smsGatewayMethod,
            gstinNumber,
            billingEmail,
            websiteUrl,
            logo: gstCertUrl,
            address
        });


        // save email and password in userCollenction
        const wlpSaveInUser = new User({
            wlpId: wlp._id,
            email: email,
            password: mobileNumber, // Assuming mobileNumber is used as a password here, which is
            role: 'wlp',
        });

        await wlpSaveInUser.save();
        await wlp.save();

        return res.status(201).json({
            sucess: true,
            message: "WLP Created Successfully",
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in creating WLP"
        })
    }
};


exports.getAllWlp = async (req, res) => {
    try {
        const userId = req.user.userId;
        if (!userId) {
            return res.status(401).json({
                sucess: false,
                message: "Unauthorized User"
            })
        }

        const wlp = await Wlp.find({ adminId: userId });

        if (!wlp) {
            return res.status(200).json({
                sucess: false,
                message: "No WLP found"
            })
        }

        return res.status(200).json({
            sucess: true,
            message: "WLP fetched successfully",
            wlps: wlp
        });

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server error in GetAllWlp"
        })
    }
};