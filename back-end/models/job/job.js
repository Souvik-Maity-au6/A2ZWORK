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
    }
})


const jobModel = model("user", jobSchema);
module.exports = jobModel;