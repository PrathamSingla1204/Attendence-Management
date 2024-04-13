const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/attendence")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const attendanceSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    default: 'Absent'
  }
});

const courseSchema = new Schema({
    courseName: {
      type: String,
      required: true
    },
    courseId:{
      type:String,
      required:true,
      unique:true,
    },
    Instructor:{
      type:String,
    },
    students: [{
        type:Schema.Types.ObjectId,
        ref:"Student",
      }]
  });
  


const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  contactNumber: String,
  courses: [{
    course:{
      type:Schema.Types.ObjectId,
      ref:"course",
    },
    courseId:{
      type:String,
      required:true,
    },
    attendences:[{
      attendence:{
        type:Schema.Types.ObjectId,
        ref:"Attendence"
      },
      date: {
        type: Date,
        unique:true

      },
      status: {
        type: String,
        enum: ['Present', 'Absent'],
        default: 'Absent'
      }
    }]
  }]
});



const User = mongoose.model('User',userSchema);
const Course = mongoose.model('Course', courseSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);
const Student = mongoose.model('Student', studentSchema);

module.exports = { 
    User,
    Course, 
    Attendance,
    Student };
