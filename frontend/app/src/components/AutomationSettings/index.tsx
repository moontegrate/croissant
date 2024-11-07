// Style
import './index.scss';
import { buttonTheme, modalTheme, textInputTheme } from '../../style/flowbiteThemes';

// Components
import { Button, Modal, TextInput } from 'flowbite-react';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setAutomationSettingsState } from '../../pages/layouts/automations/automationsSlice';

// Form validation
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Server
import { useUpdateAutomationMutation, useGetAutomationsQuery } from '../../api/apiSlice';

const AutomationSettings = () => {
    // Server
    const [updateAutomation] = useUpdateAutomationMutation();
    const isTokenReady = useAppSelector((state) => state.appSlice.isTokenReady);
    
    const { data: automationsData = [],
        isFetching: isAutomationsFetching,
        isLoading: isAutomationsLoading,
        refetch: refetchAutomations
    } = useGetAutomationsQuery(undefined, {skip: !isTokenReady});

    // Redux
    const dispatch = useAppDispatch();
    const automationSettingsState = useAppSelector((state) => state.automationsSlice.automationSettingsState);

    // Form validation sector
    const schema = yup.object().shape({
        name: yup.string().required('This field is required'),
    });

    const { control, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    });
    // End of form validation sector

    const onSubmit = (data: {name: string}) => {
        if (automationSettingsState) {
            updateAutomation({...automationSettingsState?.automation, name: data.name})
            .unwrap()
            .then((res) => {
                dispatch(setAutomationSettingsState(null));
                refetchAutomations();
            }) 
        }
    };

    return (
        <Modal
            show={automationSettingsState !== null}
            theme={modalTheme}
            dismissible
            position='center'
            onClose={() => {
                dispatch(setAutomationSettingsState(null));
            }}
        >
            <Modal.Header>
                Automation settings
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Will be update "{automationSettingsState?.automation.name}"
                </p>
            </Modal.Header>
            <Modal.Body className='pt-[1px]'>
                <form className='automation-settings__form' onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name='name'
                        control={control}
                        rules={{ required: true }}
                        defaultValue={automationSettingsState?.automation.name}
                        render={({ field }) => (
                            <TextInput
                                theme={textInputTheme}
                                placeholder='Enter name'
                                defaultValue={automationSettingsState?.automation.name}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                            />
                        )}
                    />
                    <Button theme={buttonTheme} type='submit'>Save</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AutomationSettings;