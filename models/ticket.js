import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ticketSchema = new Schema(
    {
        fanId: {
            type: String,
            required: true
        },
        matchId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model('Ticket', ticketSchema);