// Style
import './index.scss';
import {
    buttonTheme,
    toggleSwitchTheme,
    verticalDropdownTheme,
    textInputTheme
} from '../../../style/flowbiteThemes';
import {
    GoChevronRight,
    GoDuplicate, GoFileDirectory,
    GoLink,
    GoMoveToEnd,
    GoPeople,
    GoPencil,
    GoPlus,
    GoTable,
    GoTrash
} from "react-icons/go";
import { HiOutlinePower } from "react-icons/hi2";
import { SlSettings } from "react-icons/sl";

// Metadata
import { Helmet } from "react-helmet-async";

// Hooks
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/state";

// Interfaces
import { GroupData } from './interfaces';

// Redux
import { useAppDispatch } from '../../../hooks/state';
import { setAccounts, setAutomations, setGroupsFilter } from './automationsSlice';

// Components
import Sidebar from '../../../components/Sidebar';
import { BarLoader } from 'react-spinners';
import { Button, Dropdown, TextInput, ToggleSwitch } from 'flowbite-react';

// Server
import {
    useCreateAutomationGroupMutation,
    useDeleteAutomationGroupMutation,
    useGetAccountsQuery,
    useGetAutomationsQuery,
    useGetAutomationGroupsQuery,
    useUpdateAutomationMutation,
    useUpdateAutomationGroupMutation
} from '../../../api/apiSlice';

// Libraires
import { v4 as uuidv4 } from 'uuid';

const AutomationsPageLayout = () => {
    const {data: automationsData = [],
        isFetching: isAutomationsFetching,
        isLoading: isAutomationsLoading,
        refetch: refetchAutomations
    } = useGetAutomationsQuery();
    const {data: accountsData = [],
        isFetching: isAccountsFetching,
        isLoading: isAccountsLoading
    } = useGetAccountsQuery();
    const {data: groups = [], refetch: refetchGroups} = useGetAutomationGroupsQuery();
    const [updateAutomation, { isLoading: isAutomationUpdating, isSuccess: isAutomationUpdatingSuccess }] = useUpdateAutomationMutation();
    const [createGroup] = useCreateAutomationGroupMutation();
    const [updateGroup] = useUpdateAutomationGroupMutation();
    const [deleteGroup] = useDeleteAutomationGroupMutation();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useAppSelector((state) => state.appSlice.isAuthenticated);
    const accounts = useAppSelector((state) => state.automationsSlice.accounts);
    const automations = useAppSelector((state) => state.automationsSlice.automations);
    const groupsFilter = useAppSelector((state) => state.automationsSlice.groupsFilter);

    const [isMoveHover, setIsMoveHover] = useState(false);
    const [isGroupAdding, setIsGroupAdding] = useState(false);
    const [isGroupRenaming, setIsGroupRenaming] = useState<boolean | number>(false);

    const filteredAutomations = automations.filter(a => a.group === groupsFilter || groupsFilter === "all");

    const renamingForm = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
        };

        refetchAutomations();
        refetchGroups();
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        refetchAutomations().then((res) => {
            if (res.data) dispatch(setAutomations(res.data));
        });
        // eslint-disable-next-line
    }, [isAutomationUpdatingSuccess]);

    useEffect(() => {
        dispatch(setAutomations(automationsData));
        dispatch(setAccounts(accountsData));
        // eslint-disable-next-line
    }, [isAutomationsLoading, isAutomationsFetching, isAccountsLoading, isAccountsFetching]);

    const title = () => {
        if (!groupsFilter) {
            return "Without group";
        } else if (groupsFilter === 'all') {
            return "All automations";
        } else {
            return groupsFilter.toString();
        };
    };

    const handleSubmit = (group: GroupData) => {
        const form = renamingForm.current;
        if (form) {
            const input = form.elements[0] as HTMLInputElement;
            // Обновляем группу и перезагружаем данные
            updateGroup({ ...group, name: input.value }).then(() => refetchGroups());
            setIsGroupRenaming(false);
        };
    };

    return (
        <div className="private-page automations-page">
            <Helmet>
                <meta name="description" content="auto chat bot" />
                <title>Automations</title>
            </Helmet>

            <Sidebar title='Automations'>

                <Sidebar.Group>
                    <Button theme={buttonTheme} className='w-11/12 px-1 py-1' size="lg">+ New</Button>
                </Sidebar.Group>
                
                <Sidebar.Group title='Ready-made templates'>
                    <Sidebar.Item icon={<GoTable size={17} color='#FF7A7A'/>} onClick={() => navigate('/templates')}>Choose template</Sidebar.Item>
                </Sidebar.Group>

                <Sidebar.Group
                    title='Groups'
                    addButton={<GoPlus className='automations-sidebar__add'
                    onClick={() => setIsGroupAdding(!isGroupAdding)}/>}
                >
                    <Sidebar.Item focused={groupsFilter === "all"} onClick={() => dispatch(setGroupsFilter("all"))}>All automations</Sidebar.Item>
                    <Sidebar.Item focused={!groupsFilter} onClick={() => dispatch(setGroupsFilter(false))}>Without group</Sidebar.Item>
                    
                    {groups?.map((group, i) => {
                        return (
                            <Sidebar.Item
                                focused={groupsFilter === group.name}
                                onClick={() => dispatch(setGroupsFilter(group.name))}
                                key={i}
                                icon={<GoFileDirectory
                                size={17}
                                className='automations-sidebar__group-icon'/>}
                                dropdown={
                                    <>
                                        <Dropdown.Item className='vertical-dropdown__item' onClick={() => setIsGroupRenaming(i)}><GoPencil size={17}/>Rename</Dropdown.Item>
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

                                                deleteGroup(group.id).then(() => {
                                                    if (groupsFilter === group.name) dispatch(setGroupsFilter("all"));
                                                    refetchGroups();
                                                });
                                            }}
                                        >
                                            <GoTrash size={17}/>
                                            Delete
                                        </Dropdown.Item>
                                    </>
                                }
                            >
                                { isGroupRenaming === i ? 
                                    <form
                                        ref={renamingForm}
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSubmit(group);
                                        }}
                                    >
                                        <TextInput
                                            theme={textInputTheme}
                                            sizing="sm"
                                            defaultValue={group.name}
                                            onBlur={() => {
                                                handleSubmit(group);
                                            }}
                                            required
                                        />
                                    </form>
                                : group.name }
                            </Sidebar.Item>
                        )
                    })}

                    {isGroupAdding ?
                        <Sidebar.Item icon={<GoFileDirectory size={17} className='automations-sidebar__group-icon'/>}>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const form = e.target as HTMLFormElement;
                                    const input = form.elements[0] as HTMLInputElement;

                                    createGroup({
                                        id: uuidv4(),
                                        name: input.value
                                    }).then(() => {
                                        setIsGroupAdding(false);
                                        refetchGroups();
                                    });
                                }}
                            >
                                <TextInput theme={textInputTheme} sizing="sm" autoFocus onBlur={() => setIsGroupAdding(false)} required/>
                            </form>
                        </Sidebar.Item>
                    : null}
                </Sidebar.Group>
                <Sidebar.Group title='Accounts'>
                    {accounts.map((account, i) => {
                        return (
                            <Sidebar.Item icon={<img className='rounded-full' src={account.img} alt='account'/>} key={i}>{account.name}</Sidebar.Item>
                        );
                    })}
                </Sidebar.Group>
            </Sidebar>



            <div className='automations-page__content'>
                {isAutomationsLoading || isAutomationsFetching ? <div className='loading-spinner'><BarLoader color='#FF7A7A' width="100%"/></div> : null}
                <h2 className='automations-page__title'>{title()} <span>{filteredAutomations.length}</span></h2>
                <div className='automations-page__grid'>
                    {filteredAutomations.map((automation, i) => {
                        return (
                            <div
                                key={i} 
                                className='automation' 
                                onClick={(e) => {
                                    const { target } = e;
                                    if (target instanceof HTMLElement && !target.classList.contains('adbc')) navigate(`/builder/${automation.id}`);
                                }}
                            >
                                <div className='automation__top'>
                                    <div className='automation__info'>
                                        <span className={automation.enabled ? 'automation__status automation__status-enabled' : 'automation__status'}></span>
                                        <h4 className='automation__title'>{automation.name}</h4>
                                    </div>
                                    <Dropdown
                                        className='vertical-dropdown automation__dropdown adbc'
                                        theme={verticalDropdownTheme}
                                        label=""
                                        dismissOnClick
                                        renderTrigger={() => 
                                            <button className='three-dots-menu adbc'>
                                                <span className='adbc'></span>
                                                <span className='adbc'></span>
                                                <span className='adbc'></span>
                                            </button>
                                        }
                                    >
                                        <Dropdown.Item className='vertical-dropdown__item automation__dropdown-item adbc'>
                                            <div className='adbc w-full flex gap-[7px]'>
                                                <HiOutlinePower size={17}/>
                                                Turn on
                                            </div>
                                            <ToggleSwitch
                                                theme={toggleSwitchTheme}
                                                color='green'
                                                disabled={isAutomationUpdating || isAutomationsLoading}
                                                className='adbc'
                                                sizing="sm"
                                                onChange={() => {
                                                    updateAutomation({ ...automation, enabled: !automation.enabled })
                                                    .then(() => {
                                                        refetchAutomations().then((res) => {
                                                            if (res.data) dispatch(setAutomations(res.data));
                                                        });
                                                    })
                                                }}
                                                checked={automation.enabled}
                                            />    
                                        </Dropdown.Item>
                                        <Dropdown.Divider className='adbc'/>
                                        <Dropdown.Item className='vertical-dropdown__item automation__dropdown-item adbc'><GoDuplicate size={17}/>Duplicate</Dropdown.Item>
                                        {groups.length > 0 ? 
                                            <Dropdown.Item
                                                className='vertical-dropdown__item adbc'
                                                onMouseEnter={() => setIsMoveHover(true)}
                                                onMouseLeave={() => setIsMoveHover(false)}
                                            >
                                                <div className='adbc w-full flex gap-[7px]'>
                                                    <GoMoveToEnd size={17}/>
                                                    Move to...
                                                </div>
                                                <GoChevronRight size={17}/>
                                                {isMoveHover ?
                                                    <div className='automation__dropdown-sublist'>
                                                        {automation.group ?
                                                            <div
                                                                className='automation__dropdown-sublist-item adbc'
                                                                onClick={() => updateAutomation({...automation, group: false})}
                                                            >
                                                                <GoFileDirectory size={17} className='automation__dropdown-sublist-item__icon adbc'/>
                                                                All automations
                                                            </div>
                                                        : null}
                                                        {groups.map((group, i) => {
                                                            if (automation.group !== group.name) {
                                                                return (
                                                                    <div
                                                                        className='automation__dropdown-sublist-item adbc'
                                                                        key={i}
                                                                        onClick={() => updateAutomation({...automation, group: group.name})}
                                                                    >
                                                                        <GoFileDirectory size={17} className='automation__dropdown-sublist-item__icon adbc'/>
                                                                        {group.name}
                                                                    </div>
                                                                );
                                                            } else {
                                                                return null;
                                                            };
                                                        })}
                                                    </div>
                                                : null}
                                            </Dropdown.Item>
                                        : null}
                                        <Dropdown.Item className='vertical-dropdown__item automation__dropdown-item adbc'><GoLink size={17}/>Bot link</Dropdown.Item>
                                        <Dropdown.Item className='vertical-dropdown__item automation__dropdown-item adbc'><GoPeople size={17}/>Clients</Dropdown.Item>
                                        <Dropdown.Item className='vertical-dropdown__item automation__dropdown-item adbc'><SlSettings size={17}/>Settings</Dropdown.Item>
                                        <Dropdown.Divider className='adbc'/>
                                        <Dropdown.Item className='vertical-dropdown__item automation__dropdown-item text-red-500 adbc'><GoTrash color='red' size={17}/>Delete</Dropdown.Item>
                                    </Dropdown>
                                </div>
                                <div className='automation__content'>
                                    <div className='automation__content-main'>
                                        <div>
                                            <div className='automation__content-main-title'>Users</div>
                                            <div className='automation__content-main-value'>{automation.users}</div>
                                        </div>
                                        <div>
                                            <div className='automation__content-main-title'>Conversion</div>
                                            <div className='automation__content-main-value'>{automation.conversion}</div>
                                        </div>
                                    </div>
                                    <div className='automation__account'>
                                        <div className='automation__account-icon'>
                                            <img src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png" alt="account" />
                                        </div>
                                        <div className='automation__account-name'>{automation.account}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AutomationsPageLayout;
