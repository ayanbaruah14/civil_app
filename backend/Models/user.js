//making the user schema for all user+client
import mongoose from "mongoose";
const UserSchema= new mongoose.Schema(
    {
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
password: { type: String, required: true },
    role: {
      type: String,
      enum: ["CLIENT", "ENGINEER", "ADMIN"],
      required: true,
    }
},{timestamps:true});


export default mongoose.model("User", UserSchema);