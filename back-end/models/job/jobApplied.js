const { Schema, model } = require("mongoose");


const jobAppliedSchema = Schema({

    jobId:{
        type:Schema.Types.ObjectId,
        ref:"jobPost"
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
            
        },
        sumRatings:{
            type:Number,
            default:0,
            select:false
        },
        ratingsCount:{
            type:Number,
            default:0,
            select:false
        }
    },
    coverLetter:{
        type:String
    },
})


const jobModel = model("jobApplied", jobAppliedSchema);
module.exports = jobModel;