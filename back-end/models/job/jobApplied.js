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
    coverLetter:{
        type:String
    },
})


const jobModel = model("jobApplied", jobAppliedSchema);
module.exports = jobModel;