// Style
import './index.scss';
import { verticalDropdownTheme } from '../../style/flowbiteThemes';
import { GoChevronDown } from "react-icons/go";

// Components
import { Dropdown } from 'flowbite-react';

// Hooks
import { useEffect, useMemo } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setCreateAutomationForm } from '../../pages/layouts/automations/automationsSlice';


const SelectAccountInput = () => {
    const dispatch = useAppDispatch();

    const accounts = useAppSelector((state) => state.automationsSlice.accounts);
    const formData = useAppSelector((state) => state.automationsSlice.createAutomationForm);
    const selectedAccount = useAppSelector((state) => state.automationsSlice.createAutomationForm.selectedAccount);

    useEffect(() => {
        if (accounts.length !== 0) dispatch(setCreateAutomationForm({...formData, selectedAccount: accounts[0]}));
    }, []);

    const renderItems = useMemo(() => {
        if (accounts.length === 0) {
            return (
                <Dropdown.Item className='select-account__item'>Nothing found</Dropdown.Item>
            );
        } else {
            const items = accounts.map((account, i) => {
                return <Dropdown.Item key={i} className='select-account__item' onClick={() => dispatch(setCreateAutomationForm({...formData, selectedAccount: account}))}>
                    <img className='rounded-full' src={account.img ? account.img : '/account.svg'} alt='account' />
                    {account.name}
                </Dropdown.Item>
            });

            return items;
        };
    }, [accounts]);

    return (
        <Dropdown theme={verticalDropdownTheme} label="" renderTrigger={() => {
            return (
                <div className='select-account'>
                    <div className='select-account__info'>
                        {selectedAccount ? <>
                            <img src={selectedAccount.img ? selectedAccount.img : '/account.svg'} alt='account' />
                            <div>@{selectedAccount.name}</div>
                        </> : <p>Select account</p>}
                    </div>
                    <GoChevronDown/>
                </div>
            );
        }}>
            {renderItems}
        </Dropdown>
    );
};

export default SelectAccountInput;