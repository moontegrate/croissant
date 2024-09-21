// Style imports
import './index.scss';
import { buttonTheme, textInputTheme } from '../../style/flowbiteThemes';
import { GoFileDirectory, GoPlus, GoTable } from "react-icons/go";

// Components
import { Button, TextInput } from 'flowbite-react';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setGroups, setGroupsFilter } from './automationsSidebarSlice';

// Server
import { useGetAutomationGroupsQuery, useCreateAutomationGroupMutation } from '../../api/apiSlice';

// Hooks
import { useEffect, useState } from 'react';

// Other libraries
import { v4 as uuidv4 } from 'uuid';

// TEST DATA
const accounts: {name: string, img: string}[] = [
    {
        name: '@lovattro',
        img: 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png'
    },
    {
        name: '@test1',
        img: 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png'
    },
    {
        name: '@test2',
        img: 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png'
    }
];

const AutomationsSidebar = () => {
    const dispatch = useAppDispatch();
    const activeFilter = useAppSelector((state) => state.automationsSidebarSlice.groupsFilter);

    const {data: groups, refetch} = useGetAutomationGroupsQuery();
    const [createGroup, {isLoading: isGroupCreating}] = useCreateAutomationGroupMutation();

    const [isGroupAdding, setIsGroupAdding] = useState(false);

    useEffect(() => {
        refetch().then((res) => {
            dispatch(setGroups(res.data!));
        });
        // eslint-disable-next-line
    }, []);

    return (
        <nav className='automations-sidebar'>
            <div className='automations-sidebar__top'>
                <h2 className='automations-sidebar__title'>Automations</h2>
                <Button theme={buttonTheme} className='w-11/12 m-2.5 px-1 py-1' size="lg">+ New</Button>
            </div>
            <div className='automations-sidebar__group'>
                <div className='automations-sidebar__group-head'>
                    <h3 className='automations-sidebar__subtitle'>Ready-made templates</h3>
                </div>
                <div className='automations-sidebar__btn'>
                    <GoTable size={17} color='#FF7A7A'/>
                    Choose template
                </div>
            </div>
            <div className='automations-sidebar__group'>
                <div className='automations-sidebar__group-head'>
                    <h3 className='automations-sidebar__subtitle'>Groups</h3>
                    <GoPlus className='automations-sidebar__add' onClick={() => setIsGroupAdding(!isGroupAdding)}/>
                </div>
                <div className='automations-sidebar__group-items'>
                    <div
                        className={activeFilter === "all" ? "automations-sidebar__btn automations-sidebar__btn-focus" : "automations-sidebar__btn automations-sidebar__btn-unfocus"}
                        onClick={() => dispatch(setGroupsFilter("all"))}>
                        All automations
                    </div>
                    <div
                        className={activeFilter === "without-group" ? "automations-sidebar__btn automations-sidebar__btn-focus" : "automations-sidebar__btn automations-sidebar__btn-unfocus"}
                        onClick={() => dispatch(setGroupsFilter(false))}>
                        Without group
                    </div>
                    {groups?.map((group, i) => {
                        return (
                            <div
                                className={activeFilter === group.name ? "automations-sidebar__btn automations-sidebar__btn-focus" : "automations-sidebar__btn automations-sidebar__btn-unfocus"}
                                onClick={() => dispatch(setGroupsFilter(group.name))}
                                key={i}
                            >
                                <GoFileDirectory size={17} className='automations-sidebar__group-icon'/>
                                {group.name}
                            </div>
                        );
                    })}
                    {isGroupAdding ? (
                        <div
                            className="automations-sidebar__btn"
                        >
                                <GoFileDirectory size={17} className='automations-sidebar__group-icon'/>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const form = e.target as HTMLFormElement;
                                    const input = form.elements[0] as HTMLInputElement;

                                    createGroup({
                                        id: uuidv4(),
                                        name: input.value
                                    }).then(() => refetch());
                                }}>
                                    <TextInput theme={textInputTheme} sizing="sm" autoFocus onBlur={() => setIsGroupAdding(false)} required/>
                                </form>
                        </div>
                    ) : null}
                </div>
            </div>
            <div className='automations-sidebar__group'>
                <div className='automations-sidebar__group-head'>
                    <h3 className='automations-sidebar__subtitle'>Accounts</h3>
                    <GoPlus className='automations-sidebar__add'/>
                </div>
                <div className='automations-sidebar__group-items'>
                    {accounts.map((account, i) => {
                        return (
                            <div key={i} className='automations-sidebar__btn'>
                                <div className='automations-sidebar__btn-avatar'>
                                    <img src={account.img} alt='icon'/>
                                </div>
                                <div className='automations-sidebar__btn-title'>{account.name}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default AutomationsSidebar;