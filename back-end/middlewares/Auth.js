const express = require("express")
const {verify} = require("jsonwebtoken")
const userModel = require("../models/user/User")

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

            if (err.message === "jwt expired"){

                return res.status(401).send({
                    msg:"Access Token is Expired !!!"
                })

            }
        }
    },
    async generateNewAccessToken(req,res){


        try{

            const {refreshToken} = req.params;
            const userId = verify(refreshToken,process.env.PRIVATE_KEY_REFRESH_TOKEN)
            const user = await userModel.findById(userId.id)

            user.generateToken();
            user.generateRefreshToken()

            const newUser = await user.save({validateBeforeSave:false})

            return res.status(200).send({
                msg: `Welcome back ${newUser.userName}`,
                userId: newUser.id,
                userName: newUser.userName,
                userEmail: newUser.userEmail,
                accessToken: newUser.token,
                refreshToken: newUser.refreshToken,
                isClient: newUser.isClient,
                isFreelancer: newUser.isFreelancer,
            });



        }
        catch(err){
            console.log(err.message)
            if(err.message === "jwt expired"){
                return res.status(403).send({ msg: "Refresh Token is Expired !!!" });
            }
        }

    }

}