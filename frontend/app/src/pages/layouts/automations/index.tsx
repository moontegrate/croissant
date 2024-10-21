// Style
import './index.scss';
import {
    buttonTheme,
    verticalDropdownTheme,
    textInputTheme
} from '../../../style/flowbiteThemes';
import {
    GoFileDirectory,
    GoMultiSelect,
    GoPencil,
    GoPlus,
    GoSortDesc,
    GoTable,
    GoTrash
} from "react-icons/go";
import { HiOutlinePower } from "react-icons/hi2";

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
import {
    setAccounts,
    setAutomations,
    setChannelsFilter,
    setGroups,
    setGroupsFilter,
    setSortBy,
    setStatusFilter,
    setIsAutomationAdding
} from './automationsSlice';

// Components
import PageHeader from '../../../components/PageHeader';
import NoElements from '../../../components/NoElements';
import Sidebar from '../../../components/Sidebar';
import { BarLoader } from 'react-spinners';
import { Button, Dropdown, TextInput } from 'flowbite-react';
import AutomationCard from '../../../components/AutomationCard';
import CreateAutomationModal from '../../../components/CreateAutomationModal';

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
    const { data: automationsData = [],
        isFetching: isAutomationsFetching,
        isLoading: isAutomationsLoading,
        refetch: refetchAutomations
    } = useGetAutomationsQuery();
    const { data: accountsData = [],
        isFetching: isAccountsFetching,
        isLoading: isAccountsLoading
    } = useGetAccountsQuery();
    const { data: groupsData = [],
        isFetching: isGroupsFetching,
        isLoading: isGroupsLoading,
        refetch: refetchGroups
    } = useGetAutomationGroupsQuery();
    const [updateAutomation, { isLoading: isAutomationUpdating, isSuccess: isAutomationUpdatingSuccess }] = useUpdateAutomationMutation();
    const [createGroup] = useCreateAutomationGroupMutation();
    const [updateGroup] = useUpdateAutomationGroupMutation();
    const [deleteGroup] = useDeleteAutomationGroupMutation();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useAppSelector((state) => state.appSlice.isAuthenticated);
    const accounts = useAppSelector((state) => state.automationsSlice.accounts);
    const automations = useAppSelector((state) => state.automationsSlice.automations);
    const groups = useAppSelector((state) => state.automationsSlice.groups);
    const groupsFilter = useAppSelector((state) => state.automationsSlice.groupsFilter);
    const channelsFilter = useAppSelector((state) => state.automationsSlice.channelsFilter);
    const statusFilter = useAppSelector((state) => state.automationsSlice.statusFilter);
    const sortBy = useAppSelector((state) => state.automationsSlice.sort);

    const [isGroupAdding, setIsGroupAdding] = useState(false);
    const [isGroupRenaming, setIsGroupRenaming] = useState<boolean | number>(false);

    const filteredAutomationsByGroup = automations.filter(a => a.group === groupsFilter || !groupsFilter);
    const filteredAutomationsByChannel = filteredAutomationsByGroup.filter(a => a.channel === channelsFilter || channelsFilter === "All channels");
    const filteredAutomationsByStatus = filteredAutomationsByChannel.filter(a => a.enabled === (statusFilter === "On") || statusFilter === "All statuses");

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
        dispatch(setGroups(groupsData));
        // eslint-disable-next-line
    }, [isAutomationsLoading, isAutomationsFetching, isAccountsLoading, isAccountsFetching, isGroupsLoading, isGroupsFetching]);

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
        <div className="automations-page">
            <Helmet>
                <meta name="description" content="auto chat bot" />
                <title>Automations</title>
            </Helmet>

            {/* Sidebar */}
            <Sidebar title='Automations'>

                {/* Automation adding button */}
                <Sidebar.Group>
                    <Button
                        theme={buttonTheme}
                        fullSized
                        className='px-1 py-1'
                        size="lg"
                        onClick={() => dispatch(setIsAutomationAdding(true))}
                    >
                        + New
                    </Button>
                </Sidebar.Group>

                {/* Templates button */}
                <Sidebar.Group title='Ready-made templates'>
                    <Sidebar.Item icon={<GoTable size={17} color='#FF7A7A' />} onClick={() => navigate('/templates')}>Choose template</Sidebar.Item>
                </Sidebar.Group>

                {/* Automations groups */}
                <Sidebar.Group
                    title='Groups'
                    addButton={<GoPlus className='automations-sidebar__add' onClick={() => setIsGroupAdding(!isGroupAdding)} />}
                >
                    <Sidebar.Item focused={groupsFilter === false} onClick={() => dispatch(setGroupsFilter(false))}>All automations</Sidebar.Item>
                    <Sidebar.Item focused={groupsFilter === null} onClick={() => dispatch(setGroupsFilter(null))}>Without group</Sidebar.Item>

                    {groups?.map((group, i) => {
                        return (
                            <Sidebar.Item
                                focused={groupsFilter === group.name}
                                onClick={() => dispatch(setGroupsFilter(group.name))}
                                key={i}
                                icon={<GoFileDirectory
                                    size={17}
                                    className='automations-sidebar__group-icon' />}
                                dropdown={
                                    <>
                                        <Dropdown.Item className='vertical-dropdown__item' onClick={() => setIsGroupRenaming(i)}><GoPencil size={17} />Rename</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item
                                            className='vertical-dropdown__item text-red-500'
                                            onClick={() => {
                                                const target = automations.filter(a => a.group === group.name);

                                                if (target.length > 0) {
                                                    target.forEach((element, i) => {
                                                        updateAutomation({ ...element, group: false })
                                                    })
                                                    refetchAutomations();
                                                };

                                                deleteGroup(group.id).then(() => {
                                                    if (groupsFilter === group.name) dispatch(setGroupsFilter("All automations"));
                                                    refetchGroups();
                                                });
                                            }}
                                        >
                                            <GoTrash size={17} />
                                            Delete
                                        </Dropdown.Item>
                                    </>
                                }
                            >
                                {isGroupRenaming === i ?
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
                                    : group.name}
                            </Sidebar.Item>
                        )
                    })}

                    {/* If user clicks to add group button a group name input will appear*/}
                    {isGroupAdding ?
                        <Sidebar.Item icon={<GoFileDirectory size={17} className='automations-sidebar__group-icon' />}>
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
                                <TextInput theme={textInputTheme} sizing="sm" autoFocus onBlur={() => setIsGroupAdding(false)} required />
                            </form>
                        </Sidebar.Item>
                        : null}
                </Sidebar.Group>

                {/* Accounts part of sidebar */}
                <Sidebar.Group title='Accounts' addButton={<GoPlus className='automations-sidebar__add' onClick={() => { }} />}>
                    {accounts.map((account, i) => {
                        return (
                            <Sidebar.Item icon={<img className='rounded-full' src={account.img ? account.img : '/account.svg'} alt='account' />} key={i}>@{account.name}</Sidebar.Item>
                        );
                    })}
                </Sidebar.Group>
            </Sidebar>

            {/* Content part of page */}
            <div className='automations-page__content'>
                {/* Spinner */}
                {isAutomationsLoading || isAutomationsFetching ? <div className='loading-spinner'><BarLoader color='#FF7A7A' width="100%" /></div> : null}

                {/* Page head */}
                <PageHeader>
                    {/* Title */}
                    <PageHeader.Core>
                        <h2 className='automations-page__title'>{title()} <span>{filteredAutomationsByStatus.length}</span></h2>
                    </PageHeader.Core>

                    {/* Filters */}
                    <PageHeader.Extensions>

                        {/* Channel filter */}
                        <Dropdown
                            theme={verticalDropdownTheme}
                            dismissOnClick
                            label=""
                            renderTrigger={() => <div className='automations-page__filter'>
                                <span className='automations-page__filter-name'>{channelsFilter}</span>
                                <GoMultiSelect className='automations-page__filter-icon' size={20} />
                            </div>}
                        >
                            <Dropdown.Item onClick={() => dispatch(setChannelsFilter('All channels'))}>All channels</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch(setChannelsFilter('Instagram'))}>Instagram</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch(setChannelsFilter('Telegram'))}>Telegram</Dropdown.Item>
                        </Dropdown>

                        {/* Status filter */}
                        <Dropdown
                            theme={verticalDropdownTheme}
                            dismissOnClick
                            label=""
                            renderTrigger={() => <div className='automations-page__filter'>
                                <span className='automations-page__filter-name'>{statusFilter}</span>
                                <HiOutlinePower className='automations-page__filter-icon' size={20} />
                            </div>}
                        >
                            <Dropdown.Item onClick={() => dispatch(setStatusFilter("All statuses"))}>All statuses</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch(setStatusFilter("On"))}>On</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch(setStatusFilter("Off"))}>Off</Dropdown.Item>
                        </Dropdown>

                        {/* Sort */}
                        <Dropdown
                            theme={verticalDropdownTheme}
                            dismissOnClick
                            label=""
                            renderTrigger={() => <div className='automations-page__filter'>
                                <span className='automations-page__filter-name'>{sortBy}</span>
                                <GoSortDesc className='automations-page__filter-icon' size={20} />
                            </div>}
                        >
                            <Dropdown.Item onClick={() => dispatch(setSortBy('Created date'))}>Created date</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch(setSortBy('Updated date'))}>Updated date</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch(setSortBy('Name A-Z'))}>Name A-Z</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch(setSortBy('Name Z-A'))}>Name Z-A</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch(setSortBy('Less clients'))}>Less clients</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch(setSortBy('More clients'))}>More clients</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch(setSortBy('Worst conversion'))}>Worst conversion</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch(setSortBy('Best conversion'))}>Best conversion</Dropdown.Item>
                        </Dropdown>
                    </PageHeader.Extensions>
                </PageHeader>

                {/* Content */}
                <div className='automations-page__grid'>
                    {automations.length > 0 ? filteredAutomationsByStatus.map((automation, i) => {
                        return <AutomationCard automation={automation} key={i} />;
                    }) : <NoElements text="Oops! There are no automations." description="Let's create one."/>}
                </div>
            </div>

            {/* Modals */}
            <CreateAutomationModal/>
        </div>
    );
};

export default AutomationsPageLayout;
