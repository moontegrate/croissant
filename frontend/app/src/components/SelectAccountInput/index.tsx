// Style
import './index.scss';
import { verticalDropdownTheme } from '../../style/flowbiteThemes';
import { GoChevronDown } from "react-icons/go";

// Components
import { Dropdown } from 'flowbite-react';

// Hooks
import { useEffect, useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setCreateAutomationForm } from '../../pages/layouts/automations/automationsSlice';

// Interfaces
import { AccountData } from '../../pages/layouts/automations/interfaces';


const SelectAccountInput = () => {
    const dispatch = useAppDispatch();

    const accounts = useAppSelector((state) => state.automationsSlice.accounts);
    const formData = useAppSelector((state) => state.automationsSlice.createAutomationForm);
    const [selectedAccount, setSelectedAccount] = useState<AccountData>(accounts[0]);

    useEffect(() => {
        dispatch(setCreateAutomationForm({...formData, selectedAccount: selectedAccount.id}));
    }, []);

    return (
        <Dropdown theme={verticalDropdownTheme} label="" renderTrigger={() => {
            return (
                <div className='select-account'>
                    <div className='select-account__info'>
                        <img src={selectedAccount.img ? selectedAccount.img : '/account.svg'} alt='account' />
                        <div>@{selectedAccount.name}</div>
                    </div>
                    <GoChevronDown/>
                </div>
            );
        }}>
            {accounts.map((account, i) => (
                <Dropdown.Item
                    key={i}
                    onClick={() => {
                        setSelectedAccount(account);
                        dispatch(setCreateAutomationForm({...formData, selectedAccount: account.id}));
                    }}
                    className='select-account__item'
                >
                    <img src={account.img ? account.img : '/account.svg'} alt='account' />
                    <div>@{account.name}</div>
                </Dropdown.Item>
            ))}
        </Dropdown>
    );
};

export default SelectAccountInput;