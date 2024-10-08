import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        unique: [true,"Email Already Exists!"],
        required: [true,"Email is Required!"]
    },
    username: {
        type: String,
        required: [true,"Username is Required!"],
        match:  [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String
    }

})


const User = mongoose.models.User || mongoose.model("User",UserSchema);

export default User;