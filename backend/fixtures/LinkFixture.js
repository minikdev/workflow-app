import { initNodeFixture, actionNodeFixture } from "./NodeFixture";
import { workflowCreatedResponse } from "./WorkflowFixture";

export const firstLinkFixture = {
    _id: "firstLinkId",
    originNodeId: actionNodeFixture._id,
    destinationNodeId: initNodeFixture._id,
    workflowId: workflowCreatedResponse._id
}