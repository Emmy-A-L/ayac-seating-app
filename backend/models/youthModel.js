import mongoose from 'mongoose';

const youthDataSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    register: {
        type: Boolean,
        required: true,
    },
    transportInfo: {
        type: String,
        required: true,
    },
    sponsorshipStatus: {
        type: String,
        required: true,
        enum: ["Fully Sponsored", "Not Sponsored", "Transport only", "Feeding Only"]
    }
});

//create a user model using the userschema
export const YouthData = mongoose.model("YouthData", youthDataSchema);