const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    courseImageurl : String,
    courseId : Number,
    courseName : String,
    courseCategory: String,
    courseDescription : String,
    courseDuration :Number,
    courseFee:Number
    

});

const courseData = mongoose.model('course',courseSchema);
module.exports = courseData;