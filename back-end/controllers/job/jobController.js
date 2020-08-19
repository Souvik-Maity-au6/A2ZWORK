const jobPostModel = require("../../models/job/job");
const convert = require("../../converter");
const cloudinary = require("../../cloudinary");
const jobModel = require("../../models/job/job");

module.exports = {
  async jobPost(req, res) {
    // console.log(req.files);
    const {category,skills,jobTitle,projectDuration,jobDescription,projectType,expertiseLevel,budgetType,budgetAmount,freelancerNo}= req.body
    const modifiedSkills=skills.split(",")
    let imageContentProfileImage=[]
    let jobFile=[]
   
    
    req.files.forEach(file=>{

        imageContentProfileImage.push( convert(
            file.originalname,
            file.buffer,
        ))
    })
    console.log(imageContentProfileImage.length)
    jobFile = await Promise.all(imageContentProfileImage.map(async image=>{

        return await cloudinary.uploader.upload(image);
        
    }))

    let jobPostFile = jobFile.map(job=>{
        return job.secure_url
    })

    const newJob = new jobModel({
        projectFile:jobPostFile,
        skills:modifiedSkills,
        jobTitle,
        projectDuration,
        jobDescription,
        projectType,
        expertiseLevel,
        budgetType,
        budgetAmount,
        freelancerNo,
        category
        
    })
    const jobPost = await newJob.save()
    
    // console.log(jobPostFile.secure_url)

    // console.log(jobPostFile.length)

    return res.send({
        jobPost
    })
    
  }
}
