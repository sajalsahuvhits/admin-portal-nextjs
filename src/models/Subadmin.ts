import { ISubAdmin } from "@/types/types"
import { Schema, models, model } from "mongoose"


const SubAdminSchema = new Schema<ISubAdmin>(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)
console.log(models)

// Check if the model already exists to prevent overwriting it
const Subadmin = models.subadmins || model<ISubAdmin>("subadmins", SubAdminSchema)

export default Subadmin;

