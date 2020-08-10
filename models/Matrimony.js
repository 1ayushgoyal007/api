var mongoose = require('mongoose');

var matriMonySchema = mongoose.Schema({

     	name:String,
        gender:String,
        dob:String,
        maritalStatus:String,
        nativePlace:String,
        height:String,
        education:String,
        jobProfile:String,
        dateOfBaptism:String,
        Residance:String,
        contactNo:String,
        PastorName:String,
        PastorMobileNo:String,
        Father:String,
        Mother:String,
        brother:String,
        sister:String,
        partner:String,
        church:String,
        mark:String
})

module.exports = mongoose.model('Matrimony',matriMonySchema);