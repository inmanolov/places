import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, requered: true },
    email: { type: String, requered: true },
    password: { type: String, requered: true },
    id: { type: String },

})


 
export default mongoose.model('User', userSchema);