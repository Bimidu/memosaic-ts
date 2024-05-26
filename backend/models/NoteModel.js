import mongoose from 'mongoose';
const MemoSchema = mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        }

    },
    {
        timestamps:true,
    }
);

export const NoteRecord = mongoose.model('NoteRecord', MemoSchema);















