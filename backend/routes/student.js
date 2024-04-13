const express = require('express');
const { authMiddleware } = require('../middleWare');
const z = require("zod");
const { Student,Course } = require("../db");

const router = express.Router();


const createStudentBody = z.object({
    name:z.string(),
    email:z.string().email({ message: "Invalid email address" }),
    contact_no:z.string().min(8)
})

router.post("/create",authMiddleware,async (req,res)=>{
    const {success} = createStudentBody.safeParse(req.body);
    if(!success)
    {
        return res.status(411).json({
            Error:"Invalid Input"
        })
    }
   try{ 
    const existingUser = await Student.findOne({
        email: req.body.email
    }).exec();

    if(existingUser){
        return res.status(411).json({
            Message:"Student Already Exist"
        })
    }

     Student.create({
        name:req.body.name,
        email:req.body.email,
        contactNumber:req.body.contact_no
    })
    return res.status(200).json({
        msg:"Student Created"
    })}
    catch (e) {
        return res.status(500).json({ Error: e.message });
    }
})
const addCourseStudent = z.object({
    name:z.string(),
    courseId:z.string(),
    email:z.string(),
})

router.post("/AddStudenttoCourse", authMiddleware, async (req, res) => {
    const { success } = addCourseStudent.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: "Invalid Input"
        });
    }

    
    try {
        const student = await Student.findOne({
            email :req.body.email
        }).exec();
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }

        const course = await Course.findOne({
            courseId: req.body.courseId
        }).exec();

        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }

        const studentAlreadyEnrolled = student.courses.find(courseEnrollment => courseEnrollment.courseId === req.body.courseId);

        if (studentAlreadyEnrolled) {
            return res.status(409).json({
                msg: "Already Enrolled"
            });
        }

        const newCourseEnrollment = {
            course: course._id,
            courseId: course.courseId,
        };
        student.courses.push(newCourseEnrollment);
        await student.save();

        course.students.push(student._id);
await course.save();


        return res.status(200).json({ msg: "Course added to student", student });
    } catch (e) {
        return res.status(500).json({ Error: e.message });
    }
});

router.post("/attendance/:studentId/:courseId", authMiddleware, async (req, res) => {
    const { status } = req.body;
    const { studentId, courseId } = req.params;

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }

       
        const courseEnrollment = student.courses.find(course => course.courseId === courseId);
        if (!courseEnrollment) {
            return res.status(404).json({ msg: "Course not found for this student" });
        }

        
        const attendanceDate = new Date().toISOString().split('T')[0];

       
        const newAttendance = {
            date: attendanceDate,
            status: status || 'Absent' 
        };

        
        courseEnrollment.attendences.push(newAttendance);
        await student.save();

        return res.status(200).json({ msg: "Attendance added successfully", student });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

router.get("/studentList", authMiddleware, async (req, res) => {
    try {
        const students = await Student.find({});
        return res.status(200).json({
            students
        });
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
});

router.get("/studentByCourse/:courseId", authMiddleware, async (req, res) => {
    const courseId = req.params.courseId; 
    
    try {
        const students = await Student.find({
           "courses.courseId": courseId 
        });
        return res.status(200).json({
            students
        });
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
});

router.get("/studentList/:studentId", authMiddleware, async (req, res) => {
    const studentId = req.params.studentId; 
    
    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }
        return res.status(200).json({
            msg: "testing 1",
            student
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});





module.exports = router;