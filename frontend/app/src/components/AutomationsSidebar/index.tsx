// Style imports
import './index.scss';
import { buttonTheme } from '../../style/flowbiteThemes';
import { GoPlus, GoTable } from "react-icons/go";

// Components
import { Button } from 'flowbite-react';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setGroupsFilter } from './automationsSidebarSlice';

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
                    <GoTable size={15} color='#FF7A7A'/>
                    Choose template
                </div>
            </div>
            <div className='automations-sidebar__group'>
                <div className='automations-sidebar__group-head'>
                    <h3 className='automations-sidebar__subtitle'>Groups</h3>
                    <GoPlus className='automations-sidebar__add'/>
                </div>
                <div className='automations-sidebar__group-items'>
                    <div
                        className={activeFilter === "all" ? "automations-sidebar__btn automations-sidebar__btn-focus" : "automations-sidebar__btn automations-sidebar__btn-unfocus"}
                        onClick={() => dispatch(setGroupsFilter("all"))}>
                        All automations
                    </div>
                    <div
                        className={activeFilter === "without-group" ? "automations-sidebar__btn automations-sidebar__btn-focus" : "automations-sidebar__btn automations-sidebar__btn-unfocus"}
                        onClick={() => dispatch(setGroupsFilter("without-group"))}>
                        Without group
                    </div>
                </div>
            </div>
            <div className='automations-sidebar__group'>
                <div className='automations-sidebar__group-head'>
                    <h3 className='automations-sidebar__subtitle'>Accounts</h3>
                    <GoPlus className='automations-sidebar__add'/>
                </div>
                <div className='automations-sidebar__group-items'>
                    {accounts.map((i) => {
                        return (
                            <div className='automations-sidebar__btn'>
                                <div className='automations-sidebar__btn-avatar'>
                                    <img src={i.img} alt='icon'/>
                                </div>
                                <div className='automations-sidebar__btn-title'>{i.name}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default AutomationsSidebar;