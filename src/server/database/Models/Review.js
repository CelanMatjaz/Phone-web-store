import { Schema } from 'mongoose';
import mongoose from '../mongoose';

const reviewSchema = new Schema({
    authorId: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;