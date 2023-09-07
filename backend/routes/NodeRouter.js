import express from "express";
import { update} from '../services/NodeService.js'
export const nodeRouter = express.Router();

nodeRouter.put("/nodes/:id", async (req, res) => {
    const {id}= req.params;
    const {type, context} = req.body;
    try {
        const response = await update({id,type, context})
        res.status(201).send(response);
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
})