const Distributor = require("../models/CreateDistributor")
const User = require("../models/UserModel");
const CreateDelerUnderDistributor = require("../models/CreateDelerUnderDistributor");
const OemModelSchema = require("../models/CreateOemModel");
const CreateOemModel = require("../models/CreateOemModel");
const CreateDelerUnderOems = require("../models/CreateDelerUnderOems");
const createBarCode = require("../models/CreateBarCodeModel");
const ManuFactur = require("../models/ManuFacturModel");
const AllocateBarCode = require("../models/AllocateBarCode")


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



exports.createOem = async (req, res) => {
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


exports.fetchOems = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId",
            })
        };

        // const res
        const oems = await CreateOemModel.find({ manufacturId: userId });

        if (!oems) {
            return res.status(200).json({
                sucess: false,
                message: "oems Not Found",
            })
        };

        return res.status(200).json({
            sucess: true,
            message: "Oems Fetch SucessFully",
            oems
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "server Error in fetchOems "
        })
    }
}


exports.deleteOems = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId",
            });
        }

        const { oemsId } = req.body;

        if (!oemsId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide oemsId",
            });
        }

        // ✅ delete in CreateOemsModel using _id
        const deleteId = await CreateOemModel.findByIdAndDelete(oemsId);

        if (!deleteId) {
            return res.status(200).json({
                sucess: false,
                message: "Oem not Found",
            });
        }

        // ✅ delete in User Collections
        await User.findOneAndDelete({ oemId: oemsId });

        return res.status(200).json({
            sucess: true,
            message: "Oem Deleted Successfully",
        });

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in deleteOems",
        });
    }
};




exports.getOemsById = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId",
            })
        };

        const { oemsId } = req.body;

        if (!oemsId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide oemsId",
            })
        };

        // Find in Oems Collection Model
        const oemsById = await CreateOemModel.findById(oemsId);

        if (!oemsById) {
            return res.status(200).json({
                sucess: false,
                message: "No Data Found In oemsById",
            })
        };

        return res.status(200).json({
            sucess: true,
            message: "Fetchd SucessFully",
            oemsById,
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in GetOemsBy Id"
        })
    }
}



exports.editOemsById = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId",
            })
        };

        const { oemsId, business_Name, contact_Person_Name, email, gender, mobile, date_of_Birth, age, Map_Device_Edit, pAN_Number, occupation, gst_no, languages_Known, country, state, district, address } = req.body;

        const oems = await CreateOemModel.findById(oemsId);

        if (!oems) {
            return res.status(200).json({
                sucess: false,
                message: "No Data Found"
            })
        };

        if (oems.business_Name) oems.business_Name = business_Name;
        if (oems.contact_Person_Name) oems.contact_Person_Name = contact_Person_Name;
        if (oems.email) oems.email = email;
        if (oems.gender) oems.gender = gender;
        if (oems.mobile) oems.mobile = mobile;
        if (oems.date_of_Birth) oems.date_of_Birth = date_of_Birth;
        if (oems.age) oems.age = age;
        if (oems.Map_Device_Edit) oems.Map_Device_Edit = Map_Device_Edit;
        if (oems.pAN_Number) oems.pAN_Number = pAN_Number;
        if (oems.occupation) oems.occupation = occupation;
        if (oems.gst_no) oems.gst_no = gst_no;
        if (oems.languages_Known) oems.languages_Known = languages_Known;
        if (oems.country) oems.country = country;
        if (oems.state) oems.state = state;
        if (oems.district) oems.district = district;
        if (oems.address) oems.address = address;


        await oems.save();

        return res.status(200).json({
            sucess: true,
            message: "oems Edited SucessFully"
        });

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "server Error in editOemsById"
        })
    }
}



exports.createDelerUnderOems = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId"
            })
        };

        const { oemsId, select_Oems_Name, business_Name, name, email, gender, mobile, date_of_birth, age, Is_Map_Device_Edit, pan_Number, occupation, Advance_Payment, languages_Known, country, state, district, RTO_Division, Pin_Code, area, address } = req.body;

        if (!oemsId) {
            return res.state({
                sucess: false,
                message: "Please Provide oemsId"
            })
        };


        // check already exist or Not
        const findOem = await CreateDelerUnderOems.findOne({ email: email })
        if (findOem) {
            return res.status(200).json({
                sucess: false,
                message: "Oem Already Exist"
            })
        };

        const newOem = new CreateDelerUnderOems({
            manufacturId: userId,
            oemsId: oemsId,
            select_Oems_Name,
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

        await newOem.save();

        const delerOem = new User({
            manufacturId: userId,
            oemId: oemsId,
            email: email,
            password: mobile,
            role: "deler",
            oemsDelerId: newOem._id
        });
        await delerOem.save();

        return res.status(200).json({
            sucess: true,
            message: "created Sucessfully"
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in createDelerUnderOems"
        })
    }
}



exports.fetchDelerUnderOems = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId"
            })
        };

        // find userId in CreateDelerUnderOems collections
        const delerOems = await CreateDelerUnderOems.find({ manufacturId: userId });

        if (!delerOems) {
            return res.status(200).json({
                sucess: false,
                message: "No Data Found"
            })
        }

        return res.status(200).json({
            sucess: true,
            message: "DelerUnderOems Fetched SucessFully",
            delerOems,
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in fetchDelerUnderOems"
        })
    }
}


exports.deleteDelerUnderOems = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId",
            })
        };

        const { oemsId } = req.body;

        if (!oemsId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide oemsId",
            })
        };



        // Delete in CreateDelerUnderOems Collections
        const deleteOems = await CreateDelerUnderOems.findByIdAndDelete(oemsId)

        if (!deleteOems) {
            return res.status(200).json({
                sucess: false,
                message: "Data Not Found"
            })
        };




        // Delete in User Collections
        const userDelerDelet = await User.findOneAndDelete({ oemsDelerId: oemsId });


        return res.status(200).json({
            sucess: true,
            message: 'OemDeler Deleted SucessFully'
        });

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in deleteDelerUnderOems"
        })
    }
}



exports.getDelerUnderOemsById = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId",
            })
        };

        const { oemsId } = req.body;

        if (!oemsId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide oemsId",
            })
        };

        const findByIdInOems = await CreateDelerUnderOems.findById(oemsId);

        if (!findByIdInOems) {
            return res.status(200).json({
                sucess: false,
                message: "No Data Found"
            })
        };

        return res.status(200).json({
            sucess: true,
            message: "Fetch By Id SucessFully",
            findByIdInOems,
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in getDelerUnderOemsById"
        })
    }
}




exports.editDelerOem = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId",
            })
        };

        const { oemsId, select_Oems_Name, business_Name, name, email, gender, mobile, date_of_birth, age, Is_Map_Device_Edit, pan_Number, occupation, Advance_Payment, languages_Known, country, state, district, RTO_Division, Pin_Code, area, address } = req.body;

        // find in CreateDelerUnderOems collections
        const findByIdInOems = await CreateDelerUnderOems.findById(oemsId);
        console.log(oemsId)

        if (!findByIdInOems) {
            return res.status(200).json({
                sucess: false,
                message: "No Data Found"
            })
        };

        if (findByIdInOems.select_Oems_Name) findByIdInOems.select_Oems_Name = select_Oems_Name;
        if (findByIdInOems.business_Name) findByIdInOems.business_Name = business_Name;
        if (findByIdInOems.name) findByIdInOems.name = name;
        if (findByIdInOems.email) findByIdInOems.email = email;
        if (findByIdInOems.gender) findByIdInOems.gender = gender;
        if (findByIdInOems.mobile) findByIdInOems.mobile = mobile;
        if (findByIdInOems.date_of_birth) findByIdInOems.date_of_birth = date_of_birth;
        if (findByIdInOems.age) findByIdInOems.age = age;
        if (findByIdInOems.Is_Map_Device_Edit) findByIdInOems.Is_Map_Device_Edit = Is_Map_Device_Edit;
        if (findByIdInOems.pan_Number) findByIdInOems.pan_Number = pan_Number;
        if (findByIdInOems.occupation) findByIdInOems.occupation = occupation;
        if (findByIdInOems.Advance_Payment) findByIdInOems.Advance_Payment = Advance_Payment;
        if (findByIdInOems.languages_Known) findByIdInOems.languages_Known = languages_Known;
        if (findByIdInOems.country) findByIdInOems.country = country;
        if (findByIdInOems.state) findByIdInOems.state = state;
        if (findByIdInOems.district) findByIdInOems.district = district;
        if (findByIdInOems.RTO_Division) findByIdInOems.RTO_Division = RTO_Division;
        if (findByIdInOems.Pin_Code) findByIdInOems.Pin_Code = Pin_Code;
        if (findByIdInOems.area) findByIdInOems.area = area;
        if (findByIdInOems.address) findByIdInOems.address = address;

        await findByIdInOems.save();
        console.log("Save in dataBase")

        return res.status(200).json({
            sucess: false,
            message: "Edited SucessFully"
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in editDelerOem"
        })
    }
}



exports.fetchAllAssignElementDataRelatedToCreateBarCode = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide UserId"
            })
        }


        // Find in User on the Basis of userId And Find manufacturID in manufactur in collections
        const manuF = await User.findById(userId);
        if (!manuF) {
            return res.status(200).json({
                sucess: false,
                message: "Manufactur Not Found"
            })
        };


        // find manuF.manufacturId in manufactur Collection and search in assign List Elements
        const assignelementDetails = await ManuFactur.findById(manuF.manufacturId);

        if (!assignelementDetails) {
            return res.status(200).json({
                sucess: false,
                message: "ManuFactur Not Found",
            })
        };


        return res.status(200).json({
            sucess: true,
            assignelements: assignelementDetails.assign_element_list
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in fetchAllAssignElementDataRelatedToCreateBarCode",
        })
    }
}




exports.createBarCode = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide UserId"
            })
        };

        // to create BarCode Things will be rquired
        const { elementName, elementType, elementModelNo, elementPartNo, elementTacNo, elementCopNo, copValid, voltage, batchNo, baecodeCreationType, barCodeNo, is_Renew, deviceSerialNo, simDetails } = req.body;

        // ✅ Required field checks
        if (!elementName) return res.status(200).json({ success: false, message: "Please provide elementName" });
        if (!elementType) return res.status(200).json({ success: false, message: "Please provide elementType" });
        if (!elementModelNo) return res.status(200).json({ success: false, message: "Please provide elementModelNo" });
        if (!elementPartNo) return res.status(200).json({ success: false, message: "Please provide elementPartNo" });
        if (!elementTacNo) return res.status(200).json({ success: false, message: "Please provide elementTacNo" });
        if (!elementCopNo) return res.status(200).json({ success: false, message: "Please provide elementCopNo" });
        if (!copValid) return res.status(200).json({ success: false, message: "Please provide copValid" });
        if (!voltage) return res.status(200).json({ success: false, message: "Please provide voltage" });
        if (!batchNo) return res.status(200).json({ success: false, message: "Please provide batchNo" });
        if (!baecodeCreationType) return res.status(200).json({ success: false, message: "Please provide baecodeCreationType" });
        if (!barCodeNo) return res.status(200).json({ success: false, message: "Please provide barCodeNo" });
        if (!is_Renew) return res.status(200).json({ success: false, message: "Please provide is_Renew" });
        if (!deviceSerialNo) return res.status(200).json({ success: false, message: "Please provide deviceSerialNo" });
        // if (!simDetails || !Array.isArray(simDetails) || simDetails.length === 0) {
        //     return res.status(200).json({ success: false, message: "Please provide at least one SIM detail" });
        // }


        // create BarCode And Save in DataBase
        const newBarCode = new createBarCode({
            manufacturId: userId,
            elementName,
            elementType,
            elementModelNo,
            elementPartNo,
            elementTacNo,
            elementCopNo,
            copValid,
            voltage,
            batchNo,
            baecodeCreationType,
            barCodeNo,
            is_Renew,
            deviceSerialNo,
            simDetails // 👈 store directly as array
        });

        await newBarCode.save();

        return res.status(200).json({
            success: true,
            message: "BarCode created successfully",
        });

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in createBarCode"
        })
    }
};


exports.fetchBarCode = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide UserId"
            })
        };

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in fetch Barcode"
        })
    }
};


exports.fetchAllBarCode = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide UserId"
            })
        }


        // Next Forward to show all barCode in Ui In ManuFactur BarCode Page
        const allBarCods = await createBarCode.find({ manufacturId: userId });

        if (!allBarCods) {
            return res.status(200).json({
                sucess: false,
                message: "BarCodes Not Found",
            })
        };


        return res.status(200).json({
            sucess: true,
            message: "Barcode Fetched SucessFully",
            allBarCods,
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in FetchAllBarCode"
        })
    }
};



exports.fetchElementData = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide UserId"
            })
        }

        const elementData = await User.findById(userId);
        if (!elementData) {
            return res.status(200).json({
                sucess: false,
                message: "No Data Found"
            })
        }

        // also find in manuFactur collections 
        const manuF = await ManuFactur.findById(elementData.manufacturId);
        if (!manuF) {
            return res.status(200).json({
                sucess: false,
                message: "No Data Found in ManuFactur Collections"
            })
        }

        return res.status(200).json({
            sucess: true,
            message: "Element Data Fetched SucessFully",
            elementData: manuF.assign_element_list
        });

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error while fetching element data"
        })
    }
}



exports.fetchAllBarCodesNumber = async (req, res) => {
    try {
        const userId = req.user.userId; // make sure req.user exists

        if (!userId) {
            return res.status(401).json({ // 🔥 Use 401 instead of 200
                success: false,
                message: "Unauthorized: Please Provide UserId"
            });
        }

        const elementData = await User.findById(userId);

        if (!elementData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // find all barcodes for that manufacturId
        const manuF = await createBarCode.find({ manufacturId: elementData.manufacturId });

        if (!manuF || manuF.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Data Found in ManuFactur Collections"
            });
        }

        // collect all barcodes from all docs
        const allBarcodes = manuF.flatMap(doc => doc.barCodeNo);

        return res.status(200).json({
            success: true,
            message: "Element Data Fetched Successfully",
            elementData: allBarcodes,
        });

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            success: false,
            message: "Server Error while fetching element data"
        });
    }
};




exports.findDistributorUnderManufactur = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide UserId"
            })
        }

        // find in Distributor Collections
        const dist = await Distributor.find({ manufacturId: userId });
        if (!dist) {
            return res.status(200).json({
                sucess: false,
                message: "No Data Found in Distributor Collections"
            })
        }

        return res.status(200).json({
            sucess: true,
            message: "Distributor Fetched SucessFully",
            dist,
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in findDistributorUnderManufactur"
        })
    }
}



exports.findOemUnderManufactur = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide UserId"
            })
        }

        // find in OEM Collections
        const oem = await OemModelSchema.find({ manufacturId: userId });
        if (!oem) {
            return res.status(200).json({
                sucess: false,
                message: "No Data Found in oem Collections"
            })
        }

        return res.status(200).json({
            sucess: true,
            message: "oem Fetched SucessFully",
            oem,
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "Server Error in findOemUnderManufactur"
        })
    }
}




// exports.AllocateBarCode = async (req, res) => {
//     // Assuming you have imported your Mongoose models:
//     // const Distributor = require('../models/DistributorModel');
//     // const OemModelSchema = require('../models/OemModel');
//     // const createBarCode = require('../models/BarcodeModel'); // Only needed for deletion/update, not for fetching allocated barcodes

exports.AllocateBarCode = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({ // Use 401 for Unauthorized
                success: false,
                message: "Authentication failed: Please Provide UserId"
            });
        }

        // Destructure all required fields, including the partner-specific ones and 'barcodes'
        const { country, state, checkBoxValue, distributor, oem, deler, element, elementType, modelNo, Voltege, partNo, type, barcodes } = req.body;

        // --- 1. Basic Field Validation ---
        // (Combined for brevity and efficiency)
        const requiredFields = {
            country: "Country", state: "State", checkBoxValue: "Partner Type (checkBoxValue)", deler: "Dealer",
            element: "Element", elementType: "ElementType", modelNo: "ModelNo", Voltege: "Voltege",
            partNo: "PartNo", type: "Type"
        };

        for (const [key, label] of Object.entries(requiredFields)) {
            if (!req.body[key]) {
                return res.status(200).json({ // Keeping 200 status as per original code for validation errors
                    success: false,
                    message: `Please Provide ${label}`
                });
            }
        }

        // --- 2. Barcode Validation (Moved outside the 'if' block) ---
        if (!barcodes || !Array.isArray(barcodes) || barcodes.length === 0) {
            return res.status(200).json({
                success: false,
                message: "Please provide barcodes (array of strings) for allocation."
            });
        }

        // Optional: Ensure all elements in the array are non-empty strings
        if (barcodes.some(b => typeof b !== 'string' || b.trim() === '')) {
            return res.status(200).json({
                success: false,
                message: "All provided barcodes must be non-empty strings."
            });
        }


        // --- 3. Conditional Partner Logic and Allocation ---
        if (checkBoxValue === "Distributor") {
            if (!distributor) {
                return res.status(200).json({
                    success: false,
                    message: "Please Provide Distributor ID"
                });
            }

            const dist = await Distributor.findById(distributor);

            if (!dist) {
                return res.status(404).json({
                    success: false,
                    message: "Distributor not found",
                });
            }

            console.log(`Allocating ${barcodes.length} Barcodes to Distributor:`, distributor);

            // ✅ Correctly push barcodes from req.body
            dist.allocateBarcodes.push(...barcodes);

            await dist.save();

            // also create AllocateBarcode
            const allocated = await AllocateBarCode.create({
                country,
                state,
                checkBoxValue,
                // distributor,
                // oem,
                // deler,
                status: "used",
                element,
                elementType,
                modelNo,
                Voltege,
                partNo,
                type,
                barcodes,
                manufacturAllocateId: userId,
                allocatedDistributorId: distributor,
                allocatedOemId: null,
                // allocatedDelerId: deler
            })


            // Optional: Remove allocated barcodes from the 'available' list (e.g., in a Barcode model)
            // await createBarCode.updateMany(
            //     { barCodeNo: { $in: barcodes } },
            //     { $set: { status: 'ALLOCATED', distributorId: distributor } } // Example
            // );

            return res.status(200).json({
                success: true,
                message: "Barcodes allocated successfully to Distributor",
                data: dist
            });
        }

        // --- 4. OEM Allocation ---
        else if (checkBoxValue === "OEM") {
            if (!oem) {
                return res.status(200).json({
                    success: false,
                    message: "Please Provide OEM ID"
                });
            }

            // Note: Assuming OemModelSchema is imported as OemModelSchema
            const OeM = await OemModelSchema.findById(oem);

            if (!OeM) {
                return res.status(404).json({
                    success: false,
                    message: "OEM not found",
                });
            }

            // 🛑 CRITICAL FIX: Use 'barcodes' from req.body, DO NOT fetch from another model
            // Original incorrect logic removed: 
            // const elementName = await createBarCode.findOne({ elementName: element });
            // const barcodes = elementName ? elementName.barCodeNo : [];

            console.log(`Allocating ${barcodes.length} Barcodes to OEM:`, oem);

            // ✅ Correctly push barcodes from req.body
            OeM.allocateBarcodes.push(...barcodes);

            await OeM.save();


            const allocated = await AllocateBarCode.create({
                country,
                state,
                checkBoxValue,
                status: "used",
                element,
                elementType,
                modelNo,
                Voltege,
                partNo,
                type,
                barcodes,
                manufacturAllocateId: userId,
                allocatedDistributorId: null,
                allocatedOemId: oem,
                // allocatedDelerId: deler,
            })

            // Optional: Remove allocated barcodes from the 'available' list (e.g., in a Barcode model)
            // await createBarCode.updateMany(
            //     { barCodeNo: { $in: barcodes } },
            //     { $set: { status: 'ALLOCATED', oemId: oem } } // Example
            // );

            return res.status(200).json({
                success: true,
                message: "Barcodes allocated successfully to OEM",
                data: OeM
            });

        } else {
            // Handle case where checkBoxValue is neither "Distributor" nor "OEM"
            return res.status(200).json({
                success: false,
                message: "Invalid Partner Type specified by CheckBoxValue. Must be 'Distributor' or 'OEM'."
            });
        }

    } catch (error) {
        console.error("Error in AllocateBarCode:", error, error.message);
        return res.status(500).json({
            success: false,
            message: "Server Error in AllocateBarcode"
        });
    }
}



exports.fetchAll