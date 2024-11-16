const mongoose = require('mongoose');


const connectDb = async () =>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/borderless')
        console.log("mongo db connected");

    } catch(err){
        console.log("there is error not connected",err)
    }

}
module.exports = connectDb