const { Schema, model } = require("mongoose");


const jobSchema = Schema({

    jobTitle:{
        type:String
    },
    description:{
        type:String
    },
    typeOfProject:{
        type:String
    },
    jobCategory:{
        type:String
    },
    expertise:{
        type:String
    },
    budget:[{
        hourly:{
            type:Number
        },
        weekly:{
            type:Number
        }  
    }],
    projectDetailFile:{
        type:String
    },
    freelancerReview:{
        type:Number
    },
    clientReview:{
        type:Number
    },
    jobStatus:{
        type:String,
    }
})


const jobModel = model("job", jobSchema);
module.exports = jobModel;