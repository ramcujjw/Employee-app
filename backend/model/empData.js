const mongoose = require('mongoose');

const empSchema = mongoose.Schema({
   
    empId : Number,
    empName : String,
    empDesignation: String,
    empSalary : Number,
    empDepartment :String,
    empLocation:String
    
 

});

const empData = mongoose.model('course',empSchema);
module.exports = empData;