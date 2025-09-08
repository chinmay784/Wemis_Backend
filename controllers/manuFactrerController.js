const Distributor = require("../models/CreateDistributor")
const User = require("../models/UserModel")


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
                sucess: false,
                message: "Please Provide userId"
            })
        }

        const { id } = req.body;

        if (!id) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide id"
            })
        };


        const deletedistributor = await Distributor.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            sucess: true,
            message: "Distributor Deleted SucessFully"
        })

    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "server error in deleteDistributor "
        })
    }
}




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
            sucess:true,
            message:"Fetch By Id SucessFully",
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




// Not complited
exports.createOem = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(200).json({
                sucess: false,
                message: "Please Provide userId"
            })
        };




    } catch (error) {
        console.log(error, error.message);
        return res.status(500).json({
            sucess: false,
            message: "server error in createOem "
        })
    }
};