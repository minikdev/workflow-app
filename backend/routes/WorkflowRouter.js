import express from "express";
import { create } from "../services/WorkflowService.js";
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

