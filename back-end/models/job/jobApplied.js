const { Schema, model } = require("mongoose");


const jobAppliedSchema = Schema({

    jobId:{
        type:Schema.Types.ObjectId,
        ref:"job"
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    jobStatus:{
        type:String
    },
    clientReview:{
        clientId:{
            type:Schema.Types.ObjectId,
            ref:"user"
        },
        feedbBack:{
            type:String,
        },
        ratings:{
            type:Number,
            default:0
            
        }
    },
    coverLetter:{
        type:String
    },
})


const jobModel = model("jobApplied", jobAppliedSchema);
module.exports = jobModel;