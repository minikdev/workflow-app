import mongoose from 'mongoose';
import { NODE_TYPE_ENUM } from '../lib/constants.js';
const nodeSchema = new mongoose.Schema({
    context: String,
    type: {
        type: String,
        enum: NODE_TYPE_ENUM
      }
})

export const NodeModel = mongoose.model('Node', nodeSchema, 'nodes');