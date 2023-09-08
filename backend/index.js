
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { helloRouter } from './routes/HelloRouter.js';
import { workflowRouter } from './routes/WorkflowRouter.js';
import { nodeRouter } from './routes/NodeRouter.js';
import cors from 'cors';
const app = express();

app.use(cors({
  origin: "*",
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use("/api",helloRouter)
app.use("/api",workflowRouter)
app.use("/api",nodeRouter)


mongoose.connect(
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error('FAILED TO CONNECT TO MONGODB');
      console.error(err);
    } else {
      console.log('CONNECTED TO MONGODB!!');
      app.listen(8080);
    }
  }
);
