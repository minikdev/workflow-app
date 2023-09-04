import express from "express";
import { create, extend } from "../services/WorkflowService.js";
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

