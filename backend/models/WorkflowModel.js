import mongoose from 'mongoose';
const workflowSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    startingNodeId: String,
    isValid: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
})

export const WorkflowModel = mongoose.model('Workflow', workflowSchema, 'workflows');