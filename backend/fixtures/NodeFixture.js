import { INIT_NODE } from "../lib/constants.js"
export const initNodeFixture = {_id: "someNodeId", ...INIT_NODE}
export const actionNodeFixture = {_id: "actionNodeId", context:"someAction", type: "ACTION"}