const express = require("express")
const {verify} = require("jsonwebtoken")

module.exports={

    async authentication(req,res,next){

        try{

            const decodedToken = verify(req.headers.authorization,process.env.PRIVATE_KEY)
            console.log(decodedToken.id)
            console.log("one")
            req.userId = decodedToken.id
            console.log("r")
            next()

        }
        catch(err){

            return res.send({
                msg:"Authentication failed !!!"
            })
        }
    }
}