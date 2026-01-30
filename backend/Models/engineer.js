//making engineer schema
import mongoose from "mongoose";
const engSchema=new mongoose.Schema(
      {
    user_id: {//contains whole user details( name,email,pass,role)
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    engineer_type: { type: String, required: true },
    max_degree: { type: String, required: true },
    experience: { type: Number, required: true },
    verified: { type: Boolean, default: false },
    
      appliedLeads: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
  },
],
  },


  { timestamps: true }
);

const Engineer = mongoose.model("Engineer", engSchema);
export default Engineer;