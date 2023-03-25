import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const fanSchema = new Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        team: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model('Fan', fanSchema);