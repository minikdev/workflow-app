import express from "express";
import { create, deleteWorkflow, extend, getWorkflowWithNodes, listWorkflows } from "../services/WorkflowService.js";
export const workflowRouter = express.Router();

workflowRouter.post("/workflows", async (req, res) => {
    const {name} = req.body;
    try {
        const response = await create({name});
        res.status(201).send(response);
    } catch (error) {
        res.status(400).send(error);
    }
})


workflowRouter.post("/workflows/:id/extend", async (req, res) => {
    const {id}= req.params;
    const {nodeId, type, context} = req.body;
    try {
        const response = await extend({workflowId: id, nodeId, type, context})
        res.status(201).send(response);
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})

workflowRouter.get("/workflows/:id", async (req, res) => {
    const {id}= req.params;
    try {
        const response = await getWorkflowWithNodes(id)
        res.status(200).send(response);
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

workflowRouter.delete("/workflows/:id", async (req, res) => {
    const {id}= req.params;
    try {
        const response = await deleteWorkflow(id);
        res.status(204).send(response);
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

workflowRouter.get("/workflows", async (req, res) => {
    try {
        const response = await listWorkflows()
        res.status(200).send(response);
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})