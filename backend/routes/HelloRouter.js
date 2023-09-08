import express from "express";

export const helloRouter = express.Router();

helloRouter.get("/", (req, res) => {
    res.send("Hello from the backend");
})

