import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],

}, { timestamps: true });

const ownerModel = mongoose.model("Owner", ownerSchema);
export default ownerModel;