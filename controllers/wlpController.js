const { cloudinary } = require("../config/cloudinary");
const ManuFactur = require("../models/ManuFacturModel");
const User = require("../models/UserModel");
const Wlp = require("../models/WlpModel");
const CreateElement = require("../models/CreateElement");


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
        const wlp = await Wlp.findOne({ _id: user.wlpId });
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
            role: 'manufacturer',
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
};



exports.fetchManuFactur = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({
                sucess: false,
                message: "User not authorized",
            })
        }


        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                sucess: false,
                message: "User not found",
            })
        }

        const manufactur = await ManuFactur.find({ wlpId: userId });

        if (!manufactur) {
            return res.status(404).json({
                sucess: false,
                message: "ManuFactur not found",
            })
        }



        return res.status(200).json({
            sucess: true,
            message: "ManuFactur fetched successfully",
            manufactur,
        })

    } catch (error) {
        console.log(error, error.message);
        res.status(500).json({
            sucess: false,
            message: "Failed to fetch ManuFactur",
        })
    }
};



exports.deleteManuFactur = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({
                sucess: false,
                message: "User not authorized",
            })
        }

        const { manufacturId } = req.body;

        if (!manufacturId) {

            return res.status(400).json({
                sucess: false,
                message: "manufacturId is required",
            })
        }

        const manufactur = await ManuFactur.findOneAndDelete({ _id: manufacturId });

        // Also delete from user collection
        await User.findOneAndDelete({ manufacturId: manufacturId });

        if (!manufactur) {
            return res.status(404).json({
                sucess: false,
                message: "ManuFactur not found",
            })
        }

        return res.status(200).json({
            sucess: true,
            message: "ManuFactur deleted successfully",
        })


    } catch (error) {
        console.log(error, error.message);
        res.status(500).json({
            sucess: false,
            message: "Failed to delete ManuFactur",
        })
    }
}


exports.findManuFacturById = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({
                sucess: false,
                message: "User not authorized",
            })
        }


        const { manufacturId } = req.body;

        if (!manufacturId) {
            return res.status(400).json({
                sucess: false,
                message: "manufacturId is required",
            })
        }
        const manufactur = await ManuFactur.findById(manufacturId);
        if (!manufactur) {
            return res.status(404).json({
                sucess: false,
                message: "ManuFactur not found",
            })
        }
        return res.status(200).json({
            sucess: true,
            message: "ManuFactur fetched successfully",
            manufactur,
        })

    } catch (error) {
        console.log(error, error.message);
        res.status(500).json({
            sucess: false,
            message: "Failed to fetch ManuFactur by ID",
        })
    }
}



exports.editManuFactur = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({
                sucess: false,
                message: "User not authorized",
            })
        }

        const { manufacturId, country, city, manufactur_code, business_Name, gst_Number, Parent_WLP, manufacturer_Name, mobile_Number, email, toll_Free_Number, website, address } = req.body;


        const manufactur = await ManuFactur.findById(manufacturId);

        if (!manufactur) {
            return res.status(404).json({
                sucess: false,
                message: "ManuFactur not found",
            })
        }

        if (manufactur.country) manufactur.country = country;
        if (manufactur.city) manufactur.city = city;
        if (manufactur.manufactur_code) manufactur.manufactur_code = manufactur_code;
        if (manufactur.business_Name) manufactur.business_Name = business_Name;
        if (manufactur.gst_Number) manufactur.gst_Number = gst_Number;
        // if (manufactur.Parent_WLP) manufactur.Parent_WLP = Parent_WLP;
        if (manufactur.manufacturer_Name) manufactur.manufacturer_Name = manufacturer_Name;
        if (manufactur.mobile_Number) manufactur.mobile_Number = mobile_Number;
        if (manufactur.email) manufactur.email = email;
        if (manufactur.toll_Free_Number) manufactur.toll_Free_Number = toll_Free_Number;
        if (manufactur.website) manufactur.website = website;
        if (manufactur.address) manufactur.address = address;
        // Handle logo upload if a new file is provided
        if (req.files && req.files['logo'] && req.files['logo'].length > 0) {
            const file = req.files['logo'][0];
            const result = await cloudinary.uploader.upload(file.path, {
                folder: "profile_pics",
                resource_type: "raw"
            });
            manufactur.logo = result.secure_url;
        }

        await manufactur.save();
        return res.status(200).json({
            sucess: true,
            message: "ManuFactur edited successfully",
            manufactur,
        })


    } catch (error) {
        console.log(error, error.message);
        res.status(500).json({
            sucess: false,
            message: "Failed to edit ManuFactur",
        })
    }
}



exports.findElements = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authorized",
            });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Find WLP by user.wlpId
        const wlp = await Wlp.findOne({ _id: user.wlpId });
        if (!wlp) {
            return res.status(404).json({
                success: false,
                message: "WLP not found",
            });
        }

        // Extract all element names
        const names = wlp.assign_element_list.map(el => el.elementName);

        // Find VLTD true elements
        const vltd = await CreateElement.find({
            elementName: { $in: names }
        }).select("elementName is_Vltd");

        // Merge results: every assigned element gets its status
        const merged = names.map(name => {
            const found = vltd.find(v => v.elementName === name);
            return {
                elementName: name,
                is_Vltd: found ? found.is_Vltd : false
            };
        });

        return res.status(200).json({
            success: true,
            message: "Elements found successfully",
            elements: merged
        });

    } catch (error) {
        console.log(error, error.message);
        res.status(500).json({
            success: false,
            message: "Failed to findElements",
        });
    }
};


