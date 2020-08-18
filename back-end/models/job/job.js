const { Schema, model } = require("mongoose");


const jobSchema = Schema({

    projectFile:[{
        type:String
    }],
    category:{
        type:String
    },
    skills:[{
        type:String
    }],
    jobTitle:{
        type:String
    },
    projectDuration:{
        type:String
    },
    jobDescription:{
        type:String
    },
    projectType:{
        type:String
    },
    expertiseLevel:{
        type:String
    },
    budgetType:{
        type:String
    },
    budgetAmount:{
        type:Number
    },
    freelancerNo:{
        type:Number
    }
})


const jobModel = model("jobPost", jobSchema);
module.exports = jobModel;