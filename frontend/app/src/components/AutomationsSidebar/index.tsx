// Style imports
import './index.scss';
import { buttonTheme, textInputTheme, verticalDropdownTheme } from '../../style/flowbiteThemes';
import { GoFileDirectory, GoPencil, GoPlus, GoTable, GoTrash } from "react-icons/go";

// Components
import { Button, Dropdown, TextInput } from 'flowbite-react';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setGroups, setGroupsFilter } from './automationsSidebarSlice';

// Server
import {
    useCreateAutomationGroupMutation,
    useDeleteAutomationGroupMutation,
    useGetAutomationGroupsQuery,
    useGetAutomationsQuery,
    useUpdateAutomationGroupMutation,
    useUpdateAutomationMutation
} from '../../api/apiSlice';

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
    const automations = useAppSelector((state) => state.automationsSlice.automations);

    const {data: groups, refetch} = useGetAutomationGroupsQuery();
    const {refetch: refetchAutomations} = useGetAutomationsQuery();
    const [createGroup] = useCreateAutomationGroupMutation();
    const [deleteGroup] = useDeleteAutomationGroupMutation();
    const [updateAutomation] = useUpdateAutomationMutation();
    const [updateGroup] = useUpdateAutomationGroupMutation();

    const [isGroupAdding, setIsGroupAdding] = useState(false);
    const [isGroupHover, setIsGroupHover] = useState<boolean | number>(false);
    const [isGroupRename, setIsGroupRename] = useState<boolean | number>(false);

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
                    <div className='automations-sidebar__btn-info'>
                        <GoTable size={17} color='#FF7A7A'/>
                        Choose template
                    </div>
                </div>
            </div>

            {/* Groups list */}
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
                        className={activeFilter === false ? "automations-sidebar__btn automations-sidebar__btn-focus" : "automations-sidebar__btn automations-sidebar__btn-unfocus"}
                        onClick={() => dispatch(setGroupsFilter(false))}>
                        Without group
                    </div>

                    {/* Render groups buttons */}
                    {groups?.map((group, i) => {
                        return (
                            <div
                                className={activeFilter === group.name ? "automations-sidebar__btn automations-sidebar__btn-focus" : "automations-sidebar__btn automations-sidebar__btn-unfocus"}
                                onClick={() => dispatch(setGroupsFilter(group.name))}
                                onMouseEnter={() => setIsGroupHover(i)}
                                onMouseLeave={() => setIsGroupHover(false)}
                                key={i}
                            >
                                <div className='automations-sidebar__btn-info'>
                                    <GoFileDirectory size={17} className='automations-sidebar__group-icon'/>
                                    {isGroupRename === i ? 
                                        <TextInput
                                            theme={textInputTheme}
                                            sizing="sm"
                                            defaultValue={group.name}
                                            onBlur={(e) => {
                                                const input = e.target as HTMLInputElement;
                                                updateGroup({...group, name: input.value}).then(() => refetch());
                                                setIsGroupRename(false);
                                            }}
                                            required
                                        />
                                    : group.name}
                                </div>
                                <Dropdown
                                    theme={verticalDropdownTheme}
                                    label=""
                                    className='vertical-dropdown'
                                    dismissOnClick
                                    renderTrigger={() => <button className='three-dots-menu' style={{opacity: isGroupHover === i ? 1 : 0}}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </button>}
                                >
                                    <Dropdown.Item className='vertical-dropdown__item' onClick={() => setIsGroupRename(i)}><GoPencil size={17}/>Rename</Dropdown.Item>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item
                                        className='vertical-dropdown__item text-red-500'
                                        onClick={() => {
                                            const target = automations.filter(a => a.group === group.name);

                                            if (target.length > 0) {
                                                target.forEach((element, i) => {
                                                    updateAutomation({...element, group: false})
                                                })
                                                refetchAutomations();
                                            };

                                            deleteGroup(group.id).then(() => refetch());
                                        }}
                                    >
                                        <GoTrash size={17}/>
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown>
                            </div>
                        );
                    })}

                    {/* Group adding */}
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
                                    }).then(() => {
                                        setIsGroupAdding(false);
                                        refetch();
                                    });
                                }}>
                                    <TextInput theme={textInputTheme} sizing="sm" autoFocus onBlur={() => setIsGroupAdding(false)} required/>
                                </form>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Accounts part */}
            <div className='automations-sidebar__group'>
                <div className='automations-sidebar__group-head'>
                    <h3 className='automations-sidebar__subtitle'>Accounts</h3>
                    <GoPlus className='automations-sidebar__add'/>
                </div>
                <div className='automations-sidebar__group-items'>
                    {accounts.map((account, i) => {
                        return (
                            <div key={i} className='automations-sidebar__btn'>
                                <div className='automations-sidebar__btn-info'>
                                    <div className='automations-sidebar__btn-avatar'>
                                        <img src={account.img} alt='icon'/>
                                    </div>
                                    <div className='automations-sidebar__btn-title'>{account.name}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default AutomationsSidebar;