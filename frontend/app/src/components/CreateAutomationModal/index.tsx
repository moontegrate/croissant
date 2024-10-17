// Style
import './index.scss';
import { buttonTheme, modalTheme, radioButtonTheme, textInputTheme } from '../../style/flowbiteThemes';

// Components
import { Button, Label, Modal, Radio, TextInput } from 'flowbite-react';

// Hooks
import { useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setIsAutomationAdding, setCurrentModalView, setCreateAutomationForm } from '../../pages/layouts/automations/automationsSlice';
import SelectAccountInput from '../SelectAccountInput';

const CreateAutomationModal = () => {
    const dispatch = useAppDispatch();

    const isAutomationAdding = useAppSelector((state) => state.automationsSlice.isAutomationAdding);
    const currentModalView = useAppSelector((state) => state.automationsSlice.currentModalView);

    const renderView = () => {
        switch (currentModalView) {
            case 1:
                return <View1 />
            case 2:
                return <View2 />
            default:
                break;
        }
    }

    return (
        <Modal
            theme={modalTheme}
            show={isAutomationAdding}
            onClose={() => {
                dispatch(setIsAutomationAdding(false));
                dispatch(setCreateAutomationForm({automationName: null, selectedAccount: null}));
                dispatch(setCurrentModalView(1));
            }}
            dismissible
        >
            {renderView()}
        </Modal>
    );
};

const View1 = () => {
    const dispatch = useAppDispatch();
    const [createAutomationFrom, setCreateAutomationFrom] = useState('scratch');

    return (
        <>
            <Modal.Header>
                New automation
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Set message text for selected block
                </p>
            </Modal.Header>
            <Modal.Body className='py-0'>
                <fieldset className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Label
                            htmlFor='scratch'
                            className={createAutomationFrom === 'scratch' ? 'create-automation__radio-label create-automation__radio-label-focused' : 'create-automation__radio-label'}
                        >
                            <Radio theme={radioButtonTheme} onChange={() => setCreateAutomationFrom('scratch')} checked={createAutomationFrom === 'scratch'} id='scratch' name='automation-create' value="scratch" />
                            <div className='create-automation__radio-label-text'>
                                <p className='text-lg'>From scratch</p>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Suitable for advanced users who are familiar with the service features
                                </p>
                            </div>
                        </Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label
                            htmlFor='template'
                            className={createAutomationFrom === 'template' ? 'create-automation__radio-label create-automation__radio-label-focused' : 'create-automation__radio-label'}
                        >
                            <Radio theme={radioButtonTheme} disabled onChange={() => setCreateAutomationFrom('template')} checked={createAutomationFrom === 'template'} id='template' name='automation-create' value="template" />
                            <div className='create-automation__radio-label-text'>
                                <p className='text-lg'>From a ready-made template</p>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Suitable for beginners who want to start their first automation in 5 minutes
                                </p>
                            </div>
                        </Label>
                    </div>
                </fieldset>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    theme={buttonTheme}
                    fullSized
                    size="lg"
                    className='px-2 py-2'
                    onClick={() => {
                        if (createAutomationFrom === 'scratch') {
                            dispatch(setCurrentModalView(2));
                        };
                    }}
                >
                    Next
                </Button>
            </Modal.Footer>
        </>
    );
};

const View2 = () => {
    const dispatch = useAppDispatch();
    const formData = useAppSelector((state) => state.automationsSlice.createAutomationForm);
    const [automationNameError, setAutomationNameError] = useState<boolean>(false);
    const [selectedAccountError, setSelectedAccountError] = useState<boolean>(false);

    function checkFields() {
        if (formData.automationName === null || formData.automationName === '') {
            setAutomationNameError(true);
        } else {
            setAutomationNameError(false);
        };
        if (formData.selectedAccount === null) {
            setSelectedAccountError(true);
        } else {
            setSelectedAccountError(false);
        };
    };

    return (
        <>
            <Modal.Header>
                New automation
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Will be placed in the "All automations"
                </p>
            </Modal.Header>
            <Modal.Body className='py-[1px]'>
                <div className='create-automation__form'>
                    <TextInput
                        theme={textInputTheme}
                        value={formData.automationName ? formData.automationName : ""}
                        onChange={(e) => {
                            dispatch(setCreateAutomationForm({...formData, automationName: e.target.value}));
                        }}
                        placeholder='Automation name'
                        required
                    />
                    {automationNameError ? <p className='text-[14px] text-red-500 leading-none'>This field is required.</p> : null}
                    
                    <SelectAccountInput/>
                    {selectedAccountError ? <p className='text-[14px] text-red-500 leading-none'>This field is required.</p> : null}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    theme={buttonTheme}
                    fullSized
                    size="lg"
                    className='px-2 py-2'
                    onClick={() => {
                        checkFields()
                    }}
                >Create</Button>
            </Modal.Footer>
        </>
    );
};

export default CreateAutomationModal;