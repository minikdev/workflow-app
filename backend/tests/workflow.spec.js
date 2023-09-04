import { create, extend } from '../services/WorkflowService.js'
import { insert as insertNode, findById as findNodeById} from '../repositories/NodeRepository.js'
import { insert, findById } from '../repositories/WorkflowRepository.js'
import { initNodeFixture } from '../fixtures/NodeFixture.js'
import { workflowCreatedResponse } from '../fixtures/WorkflowFixture.js'
import { INIT_NODE, NODE_TYPE_ENUM } from '../lib/constants.js'
jest.mock('../repositories/WorkflowRepository.js',() => ({
    insert: jest.fn(),
    findById: jest.fn(),
}))
jest.mock('../repositories/NodeRepository.js',() => ({
    insert: jest.fn(),
    findById: jest.fn(),
}))

describe("Workflow tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('should create workflow successfully', async () => {
        const name = "test";
        insertNode.mockResolvedValue(initNodeFixture)
        insert.mockResolvedValue({...workflowCreatedResponse, name})

        const response = await create({name});
        expect(response).toEqual({...workflowCreatedResponse, name})
    })
    it('should throw workflow not found error', async () => {
        findById.mockResolvedValue(null)
        try {
            await extend({workflowId: "123", nodeId: "456"});
        } catch (error) {
            expect(error.message).toEqual("Workflow not found")
        }
    })

    it('should throw node not found', async () => {
        findById.mockResolvedValue(workflowCreatedResponse)
        findNodeById.mockResolvedValue(null)
        try {
            await extend({ workflowId: workflowCreatedResponse._id, nodeId: "random-node-id" });
        } catch (error) {
            expect(error.message).toEqual("Node not found")
        }
    })
    it('should invalid node type', async () => {
        findById.mockResolvedValue(workflowCreatedResponse)
        findNodeById.mockResolvedValue(initNodeFixture)
        try {
            await extend({ workflowId: workflowCreatedResponse._id, nodeId: initNodeFixture._id, type: "random-type" });
        } catch (error) {
            expect(error.message).toEqual("Invalid node type")
        }
    })

    it('should invalid node type when the type is INIT', async () => {
        findById.mockResolvedValue(workflowCreatedResponse)
        findNodeById.mockResolvedValue(initNodeFixture)
        try {
            await extend({ workflowId: workflowCreatedResponse._id, nodeId: initNodeFixture._id, type: INIT_NODE.type });
        } catch (error) {
            expect(error.message).toEqual("Invalid node type")
        }
    })

    it.only('should extend workflow with a new node', async () => {
        findById.mockResolvedValue(workflowCreatedResponse)
        const workflow = await extend({workflowId: workflowCreatedResponse._id, nodeId: workflowCreatedResponse.startingNodeId, type: NODE_TYPE_ENUM[1]});
        expect(workflow._id).toEqual(workflowCreatedResponse._id)
    })
})