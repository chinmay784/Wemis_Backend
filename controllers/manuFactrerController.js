const Distributor = require("../models/CreateDistributor")
const User = require("../models/UserModel");
const CreateDelerUnderDistributor = require("../models/CreateDelerUnderDistributor");
const OemModelSchema = require("../models/CreateOemModel")


exports.createDistributor = async (req, res) => {
    try {
        const userId = req.user.userId

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId"
            })
        }

        const { business_Name, contact_Person_Name, email, gender, mobile, date_of_Birth, age, Map_Device_Edit, pAN_Number, occupation, advance_Payment, languages_Known, country, state, district, address } = req.body;


        if (!business_Name || !contact_Person_Name || !email || !gender || !mobile || !date_of_Birth || !age || !Map_Device_Edit || !pAN_Number || !occupation || !advance_Payment || !languages_Known || !country || !state || !district || !address) {
            return res.status(200).json({
                sucess: false,
                message: "please provide all fields"
            })
        };

        // find allready present

        const distributor = await Distributor.findOne({ email: email });

        if (distributor) {
            return res.status(200).json({
                sucess: false,
                message: "Distributor Already Exist"
            })
        }


        const dist = new Distributor({
            manufacturId: userId,
            business_Name,
            contact_Person_Name,
            email,
            gender,
            mobile,
            date_of_Birth,
            age,
            Map_Device_Edit,
            pAN_Number,
            occupation,
            advance_Payment,
            languages_Known,
            country,
            state,
            district, address
        });


        await dist.save();

        // create user in USER Collection
        const distSaveInUser = new User({
            distributorId: dist._id,
            email: email,
            password: mobile,
            role: "distibutor",
        })

        await distSaveInUser.save();

        return res.status(200).json({
            sucess: true,
            message: "Distributor Created SucessFully"
        })


    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in createDistributor"
        })
    }
}


exports.fetchDistributor = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId"
            })
        }

        // find in distributor 
        const distributor = await Distributor.find({ manufacturId: userId });

        if (!distributor) {
            return res.status(200).json({
                sucess: false,
                message: "No Distributor Found"
            })
        }

        return res.status(200).json({
            sucess: true,
            message: 'Distributor fetched Sucessfully',
            distributor,
        })
    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "server error in Fetch Distributor "
        })
    }
}


exports.deleteDistributor = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                success: false,
                message: "Please Provide userId"
            });
        }

        const { id } = req.body;

        if (!id) {
            return res.status(200).json({
                success: false,
                message: "Please Provide id"
            });
        }

        // Delete Distributor
        const deletedDistributor = await Distributor.findByIdAndDelete(id);

        if (!deletedDistributor) {
            return res.status(404).json({
                success: false,
                message: "Distributor not found"
            });
        }

        // Delete linked User by distributorId
        console.log("Before User Delete in Distributor");
        const deletedUser = await User.findOneAndDelete({ distributorId: id });
        console.log("After User Delete in Distributor");

        return res.status(200).json({
            success: true,
            message: "Distributor Deleted Successfully",
            deletedDistributor,
            deletedUser
        });

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            success: false,
            message: "Server error in deleteDistributor",
            error: error.message
        });
    }
};





exports.fetchDistributorById = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId",
            })
        };

        const { distributorId } = req.body;

        if (!distributorId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide distributorId",
            })
        }

        const single = await Distributor.findById(distributorId);

        if (!single) {
            return res.status(200).json({
                sucess: false,
                message: "No distributor Found",
            })
        }

        return res.status(200).json({
            sucess: true,
            message: "Fetch By Id SucessFully",
            single
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in fetchDistributorById"
        })
    }
};




exports.editDistributor = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId",
            })
        };

        const { distributorId, business_Name, contact_Person_Name, email, gender, mobile, date_of_Birth, age, Map_Device_Edit, pAN_Number, occupation, advance_Payment, languages_Known, country, state, district, address } = req.body;

        const dist = await Distributor.findById(distributorId);

        if (!dist) {
            return res.status(404).json({
                sucess: false,
                message: "dist not found",
            })
        }

        if (dist.business_Name) dist.business_Name = business_Name;
        if (dist.contact_Person_Name) dist.contact_Person_Name = contact_Person_Name;
        if (dist.email) dist.email = email;
        if (dist.gender) dist.gender = gender;
        if (dist.mobile) dist.mobile = mobile;
        if (dist.date_of_Birth) dist.date_of_Birth = date_of_Birth;
        if (dist.age) dist.age = age;
        if (dist.Map_Device_Edit) dist.Map_Device_Edit = Map_Device_Edit;
        if (dist.pAN_Number) dist.pAN_Number = pAN_Number;
        if (dist.occupation) dist.occupation = occupation;
        if (dist.advance_Payment) dist.advance_Payment = advance_Payment;
        if (dist.languages_Known) dist.languages_Known = languages_Known;
        if (dist.country) dist.country = country;
        if (dist.state) dist.state = state;
        if (dist.district) dist.district = district;
        if (dist.address) dist.address = address;

        await dist.save();
        return res.status(200).json({
            sucess: true,
            message: "dist edited successfully",
            dist,
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in editDistributor"
        })
    }
}





exports.createDelerUnderDistributor = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId"
            })
        };

        const { distributorId, select_Distributor_Name, business_Name, name, email, gender, mobile, date_of_birth, age, Is_Map_Device_Edit, pan_Number, occupation, Advance_Payment, languages_Known, country, state, district, RTO_Division, Pin_Code, area, address } = req.body;

        if (!distributorId) {
            return res.state({
                sucess: false,
                message: "Please Provide distributorId"
            })
        };


        const findDel = await CreateDelerUnderDistributor.findOne({ email: email })
        if (findDel) {
            return res.status(200).json({
                sucess: false,
                message: "Already Exist"
            })
        };

        const newDel = new CreateDelerUnderDistributor({
            manufacturId: userId,
            distributorId: distributorId,
            select_Distributor_Name,
            business_Name,
            name,
            email,
            gender,
            mobile,
            date_of_birth,
            age,
            Is_Map_Device_Edit,
            pan_Number,
            occupation,
            Advance_Payment,
            languages_Known,
            country,
            state,
            district,
            RTO_Division,
            Pin_Code,
            area,
            address
        })

        await newDel.save();
        const delerDistributor = new User({
            manufacturId: userId,
            distributorId: distributorId,
            email: email,
            password: mobile,
            role: "deler",
            distributorDelerId: newDel._id
        });
        await delerDistributor.save();

        return res.status(200).json({
            sucess: true,
            message: "created Sucessfully"
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in createDelerUnderDistributor"
        })
    }
}





exports.fetchDelerDistributor = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId"
            })
        }

        // Find in CreateDelerUnderDistributor collection
        const fetchAllCreateDelerUnderDistributor = await CreateDelerUnderDistributor.find({ manufacturId: userId });

        if (!fetchAllCreateDelerUnderDistributor) {
            return res.status(200).json({
                sucess: false,
                message: "No Data Found "
            })
        }

        return res.status(200).json({
            sucess: true,
            message: "fetchDelerDistributor Data SucessFully",
            fetchAllCreateDelerUnderDistributor,
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in fetchDelerDistributor "
        })
    }
}


exports.deleteDelerDistributor = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                success: false,
                message: "Please Provide UserId"
            });
        }

        const { delerId } = req.body;

        if (!delerId) {
            return res.status(200).json({
                success: false,
                message: "Please Provide delerId"
            });
        }

        // Delete in CreateDelerUnderDistributor collection by custom field
        const deletedDeler = await CreateDelerUnderDistributor.findOneAndDelete({ delerId });

        if (!deletedDeler) {
            return res.status(404).json({
                success: false,
                message: "DelerDistributor not found"
            });
        }

        // Delete corresponding user(s) linked with this deler
        const deletedUser = await User.findOneAndDelete({ distributorDelerId: delerId });

        return res.status(200).json({
            success: true,
            message: "DelerDistributor Deleted Successfully",
            deletedDeler,
            deletedUser
        });

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            success: false,
            message: "Server error in deleteDelerDistributor",
            error: error.message
        });
    }
};



exports.
createOem = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId"
            })
        };


        const { business_Name, contact_Person_Name, email, gender, mobile, date_of_Birth, age, Map_Device_Edit, pAN_Number, occupation, gst_no, languages_Known, country, state, district, address } = req.body;

        if (!business_Name || !contact_Person_Name || !email || !gender || !mobile || !date_of_Birth || !age || !Map_Device_Edit || !pAN_Number || !occupation || !gst_no || !languages_Known || !country || !state || !district || !address) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide allFields"
            })
        }


        const newOem = await OemModelSchema.findOne({ email });

        if (newOem) {
            return res.status(200).json({
                sucess: false,
                message: "Oem Already Exist"
            })
        }

        const oemCreate = new OemModelSchema({
            manufacturId: userId,
            business_Name,
            contact_Person_Name,
            email,
            gender,
            mobile,
            date_of_Birth,
            age,
            Map_Device_Edit,
            pAN_Number,
            occupation,
            gst_no,
            languages_Known,
            country,
            state,
            district,
            address
        })

        console.log("Before Data Save in DataBase")

        // ✅ save to DB
        await oemCreate.save();

        // and also save in User Collections
        const oemSaveInUser = new User({
            oemId: oemCreate._id,
            email: email,
            password: mobile,
            role: "oem"
        });


        // ✅ save to DB
        await oemSaveInUser.save();
        console.log("After Data Save in DataBase")

        console.log(oemCreate , "user -" , oemSaveInUser)

        return res.status(200).json({
            sucess: true,
            message: "Oem Created SucessFully"
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server error in createOem"
        })
    }
}