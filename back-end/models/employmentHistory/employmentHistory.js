const { Schema, model } = require("mongoose");

const empHistorySchema = Schema({

    companyName:{
        type:String
    },
    location:[
        {

            type:String
        }
    ],
    jobTitle:{
        type:String
    },
    startingYear:{
        type:String
    },
    endingYear:{
        type:String
    },
    description:{
        type:String
    },
    otherExperience:[

        {
            subject:{
                type:String
            },
            description:{
                type:String
            }
        }

    ],
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
})

const empHistoryModel = model("user", empHistorySchema);
module.exports = empHistoryModel;