// Style imports
import './index.scss';
import { toggleSwitchTheme, verticalDropdownTheme } from '../../../style/flowbiteThemes';
import { GoChevronRight, GoDuplicate, GoFileDirectory, GoLink, GoMoveToEnd, GoPeople, GoTrash } from "react-icons/go";
import { HiOutlinePower } from "react-icons/hi2";
import { SlSettings } from "react-icons/sl";

// Metadata
import { Helmet } from "react-helmet-async";

// Hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/state";

// Redux
import { useAppDispatch } from '../../../hooks/state';

// Components
import AutomationsSidebar from '../../../components/AutomationsSidebar';
import { BarLoader } from 'react-spinners';
import { Dropdown, ToggleSwitch } from 'flowbite-react';

// Server
import { useGetAutomationsQuery, useUpdateAutomationMutation } from '../../../api/apiSlice';
import { setAutomations } from './automationsSlice';

const AutomationsPageLayout = () => {
    const {data = [],
        isFetching,
        isLoading,
        refetch
    } = useGetAutomationsQuery();
    const [updateAutomation, { isLoading: isAutomationUpdating, isSuccess: isAutomationUpdatingSuccess }] = useUpdateAutomationMutation();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useAppSelector((state) => state.appSlice.isAuthenticated);
    const automations = useAppSelector((state) => state.automationsSlice.automations);
    const groupsFilter = useAppSelector((state) => state.automationsSidebarSlice.groupsFilter);
    const groups = useAppSelector((state) => state.automationsSidebarSlice.groups);
    const [isMoveHover, setIsMoveHover] = useState(false);

    const filteredAutomations = automations.filter(a => a.group === groupsFilter || groupsFilter === "all");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
        };

        refetch();
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        refetch().then((res) => {
            if (res.data) dispatch(setAutomations(res.data));
        });
        // eslint-disable-next-line
    }, [isAutomationUpdatingSuccess]);

    useEffect(() => {
        dispatch(setAutomations(data));
        // eslint-disable-next-line
    }, [isLoading, isFetching]);

    const title = () => {
        if (!groupsFilter) {
            return "Without group";
        } else if (groupsFilter === 'all') {
            return "All automations";
        } else {
            return groupsFilter.toString();
        };
    };

    return (
        <div className="public-page automations-page">
            <Helmet>
                <meta name="description" content="auto chat bot" />
                <title>Automations</title>
            </Helmet>
            <AutomationsSidebar/>
            <div className='automations-page__content'>
                {isLoading || isFetching ? <div className='loading-spinner'><BarLoader color='#FF7A7A' width="100%"/></div> : null}
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
                                                disabled={isAutomationUpdating || isLoading}
                                                className='adbc'
                                                sizing="sm"
                                                onChange={() => {
                                                    updateAutomation({ ...automation, enabled: !automation.enabled })
                                                    .then(() => {
                                                        refetch().then((res) => {
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
