import mongoose from 'mongoose';

const youthDataSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    register: {
        type: Boolean,
        required: true,
    },
    transportInfo: {
        type: String,
        required: true,
    },
});

//create a user model using the userschema
export const YouthData = mongoose.model("YouthData", youthDataSchema);