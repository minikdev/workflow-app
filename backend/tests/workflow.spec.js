import { create } from '../services/WorkflowService.js'
import { insert as insertNode } from '../repositories/NodeRepository.js'
import { insert } from '../repositories/WorkflowRepository.js'
import { initNodeFixture } from '../fixtures/NodeFixture.js'
import { workflowCreatedResponse } from '../fixtures/WorkflowFixture.js'
jest.mock('../repositories/WorkflowRepository.js',() => ({
    insert: jest.fn(),
}))
jest.mock('../repositories/NodeRepository.js',() => ({
    insert: jest.fn(),
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
})