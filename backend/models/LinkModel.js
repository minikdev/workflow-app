import mongoose from 'mongoose';
const linkSchema = new mongoose.Schema({
    originNodeId: String,
    destinationNodeId: String,
})

export const LinkModel = mongoose.model('Link', linkSchema, 'links');