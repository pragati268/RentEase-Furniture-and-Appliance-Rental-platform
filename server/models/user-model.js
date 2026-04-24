import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/rentease");

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: Number, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  pincode: { type: String, required: true },
}, { _id: false });

const userSchema = new mongoose.Schema({
    fullname: { 
        type: String, 
        required: true,
        trim: true
    },

    email: { 
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    addresses: [addressSchema],

    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]

}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);

export default userModel;
