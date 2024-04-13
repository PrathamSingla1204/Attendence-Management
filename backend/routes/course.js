const express = require('express');
const { authMiddleware } = require('../middleWare');
const z = require("zod");
const { Student,Course } = require("../db");

const router = express.Router();

const courseBody = z.object({
    courseName:z.string(),
    courseId:z.string(),
    instructor:z.string()
})


router.post("/create",authMiddleware,async (req,res)=>{
     const {success} = courseBody.safeParse(req.body);
     if(!success){
        return res.status(401).json({
            msg:"INVALID INPUTS"
        })
     }
     try{
            const existingCourse = await Course.findOne({
                courseId:req.body.courseId
            }).exec();

            if(existingCourse)
            {
                return res.status(411).json({
                    msg:"Course Already Exist"
                })
            }

            Course.create({
                courseName:req.body.courseName,
                courseId:req.body.courseId,
                Instructor:req.body.instructor  
            })

            return res.status(200).json({
                msg:"Course Created"
            })
     }
     catch(e){
        return res.status(500).json({ Error: e.message });
     }
})

router.get("/courseList", authMiddleware, async (req, res) => {
    try {
        const courses = await Course.find({
            
        });
        return res.status(200).json({
            courses
        });
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
});


module.exports = router;