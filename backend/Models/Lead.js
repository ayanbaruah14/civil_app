import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    budget: Number,
    floors: Number,

    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },

    isOpen: {
      type: Boolean,
      default: true,
    },

    requestedEngineers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Engineer",
      },
    ],

    applicants: [
      {
        engineer_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Engineer",
        },
        appliedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
