
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { NODE_TYPES_ENUM } from '../../lib/constants';
export const EditNodeModal = ({ handleEdit, handleClose, isLoading, editNodeModalState }) => {
    const modalContainer = document.getElementById('modal-root');
    const [context, setContext] = useState('');
    const [type, setType] = useState(NODE_TYPES_ENUM[1]);
    const [isContextValid, setIsContextValid] = useState(true);
    const handleEditClick = () => {
        if (isContextValid) {
            handleEdit({ context, type, nodeId: editNodeModalState?.node.id });
            setContext('');
            setIsContextValid(true);
        }
    };
    const handleCloseClick = () => {
        setContext('');
        setIsContextValid(true);
        setType(NODE_TYPES_ENUM[1]);
        handleClose();
    }
    const onInputChange = (e) => {
        setContext(e.target.value)
        if (e.target.value?.trim() === '') {
            setIsContextValid(false);
        } else {
            setIsContextValid(true);
        }
    }
    const onSelectChange = (e) => {
        setType(e.target.value)
    }
    useEffect(() => {
        if(editNodeModalState?.node){
            setContext(editNodeModalState?.node?.label);
            setType(editNodeModalState?.node?.type);
        }else{
            setContext('');
            setType(NODE_TYPES_ENUM[1]);
        }
    },[editNodeModalState?.node])

    if (!editNodeModalState?.isVisible) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-primary rounded-lg p-3 shadow-md w-80 h-1/4 flex flex-col sm:w-96 md:w-2/5 md:h-3/6 justify-evenly sm:p-6">
                <div>
                    <h2 className="text-xl font-semibold text-white">Edit Node</h2>
                </div>
                <div>
                    <input type="text" placeholder="Context of Node" className={
                        `input w-full  bg-white ${!isContextValid ? 'input-error' : ''}`
                    } value={context} onChange={(e) => onInputChange(e)} />
                    {!isContextValid && (
                        <div className='w-full flex justify-end'>
                            <p className="text-error text-sm mt-1">Context is required</p>
                        </div>

                    )}
                </div>
                <div >
                    <select className="select w-full bg-white" onChange={onSelectChange} defaultValue={type}>
                        <option >{NODE_TYPES_ENUM[1]}</option>
                        { NODE_TYPES_ENUM.slice(2).map((nodeType) => <option key={nodeType}>{nodeType}</option>)}
                    </select>
                   
                </div>
                <div>
                    <div className="flex justify-end">

                        <button
                            className="btn btn-neutral text-xs mr-2"
                            onClick={handleEditClick}
                        >
                            {isLoading ? (<span className="loading loading-spinner text-primary"></span>) : 'Update'}
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