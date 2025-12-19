import mongoose from "mongoose"; // Ensure mongoose is imported

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Newspaper', 'JobSeeker'], default: 'JobSeeker' },
  profile: {
    city: String,
    phoneNumber: String,
    education: String, 
    skills: [String],
    resumeLink: String
  }
}, { timestamps: true });

// This is the line that fixes your error
const User = mongoose.model("User", UserSchema);
export default User;