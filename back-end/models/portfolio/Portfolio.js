const { Schema, model } = require("mongoose");

const portfolioSchema = Schema({

    image:{
        type:String,
    },
    portfolioLink:{
        type:String
    },
    projectName:{
        type:String
    },
    certification:[
        {
            title:{
                type:String
            },
            certifiationLink:{
                type:String
            }
        }
    ],
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
        
})

const portfolioModel = model("user", portfolioSchema);
module.exports = portfolioModel;