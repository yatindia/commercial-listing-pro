import "dotenv/config";
import UID from "short-unique-id"
import mongoose from "mongoose";
import Property from "./model/Property"


try { 
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USERID}:${process.env.MONGO_PASSWORD}@cluster0.segtq.mongodb.net/test`);
    console.log("Connected to mongoDB.");
} catch (error) {
    throw error;
}






(async ()=>{

    let ids = [ "yMpMEaSd", "iqbP8Jnh", "ps5ypTJr", "24FSaAYx", "vmonIEf1", "wnUfwyat", "ZVcxl5je", "FHudfFTC", "wuZ19hDL", "WX2JRuUr", "ud1XsW9K", "eDPQWyhU", "SvcbA6zr", "76zhfXZ1", "5mMIaZ0J" ]

 let properties = await Property.find({})

 properties.forEach(async (property:any, index:any)=>{
    Property.findByIdAndUpdate(property._id,  {uid:`cls-${ids[index]}`})
    .catch(err => {
        console.log(err);
        
    })
    console.log(ids[index]);
    
 })

})();


