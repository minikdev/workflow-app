
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
export const CreateWorkflowModal = ({ isVisible, handleCreate, handleClose, isLoading }) => {
    const modalContainer = document.getElementById('modal-root');
    const [workflowName, setWorkflowName] = useState('');
    const [isNameValid, setIsNameValid] = useState(true); 
    const handleCreateClick = () => {
        if (isNameValid) {
            handleCreate(workflowName);
            setWorkflowName('');
            setIsNameValid(true);
        }
    };
    const handleCloseClick = () => {
        setWorkflowName('');
        setIsNameValid(true);
        handleClose();
    }
    const onInputChange = (e) => {
        setWorkflowName(e.target.value)
        if(e.target.value?.trim() === ''){
            setIsNameValid(false);
        }else{
            setIsNameValid(true);
        }
    }
    
    if (!isVisible) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-primary rounded-lg p-3 shadow-md w-80 h-1/4 flex flex-col sm:w-96 md:w-2/5 md:h-2/6 justify-evenly sm:p-6">
                <div>
                    <h2 className="text-xl font-semibold text-white">Create Workflow</h2>
                </div>
                <div >
                    <input type="text" placeholder="Create Workflow" className={
                        `input w-full  bg-white ${!isNameValid ? 'input-error' : ''}`
                    } value={workflowName} onChange={(e) => onInputChange(e)} />
                    {!isNameValid && (
                        <div className='w-full flex justify-end'>
                            <p className="text-error text-sm mt-1">Workflow Name is required.</p>
                        </div>
                        
                    )}
                </div>
                <div>
                    <div className="flex justify-end">

                        <button
                            className="btn btn-neutral text-xs mr-2"
                            onClick={handleCreateClick}
                        >
                            {isLoading ? (<span className="loading loading-spinner text-primary"></span>) : 'Create'}
                        </button>
                        <button
                            className="btn btn-error text-xs "
                            onClick={handleCloseClick}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        modalContainer
    );
};