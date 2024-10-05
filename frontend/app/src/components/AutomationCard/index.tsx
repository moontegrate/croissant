// Style
import './index.scss';
import { toggleSwitchTheme, verticalDropdownTheme } from '../../style/flowbiteThemes';
import { HiOutlinePower } from "react-icons/hi2";
import { SlSettings } from "react-icons/sl";
import { GoChevronRight, GoDuplicate, GoFileDirectory, GoLink, GoMoveToEnd, GoPeople, GoTrash } from "react-icons/go";

// Components
import { Dropdown, ToggleSwitch } from 'flowbite-react';

// Interfaces
import { AutomationData } from '../../pages/layouts/automations/interfaces';

// Hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setAutomations } from '../../pages/layouts/automations/automationsSlice';

// Server
import { useDeleteAutomationMutation, useGetAutomationsQuery, useUpdateAutomationMutation } from '../../api/apiSlice';

const AutomationCard: React.FC<{automation: AutomationData}> = ({automation}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {data: automationsData = [],
        isFetching: isAutomationsFetching,
        isLoading: isAutomationsLoading,
        refetch: refetchAutomations
    } = useGetAutomationsQuery();
    const [updateAutomation, { isLoading: isAutomationUpdating, isSuccess: isAutomationUpdatingSuccess }] = useUpdateAutomationMutation();
    const [deleteAutomation] = useDeleteAutomationMutation();

    const [isMoveHover, setIsMoveHover] = useState(false);

    const automations = useAppSelector((state) => state.automationsSlice.automations);
    const groups = useAppSelector((state) => state.automationsSlice.groups);
    
    return (
        <div
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
                            <HiOutlinePower size={17} />
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
                    <Dropdown.Divider className='adbc' />
                    <Dropdown.Item className='vertical-dropdown__item automation__dropdown-item adbc'><GoDuplicate size={17} />Duplicate</Dropdown.Item>
                    {groups.length > 0 ?
                        <Dropdown.Item
                            className='vertical-dropdown__item adbc'
                            onMouseEnter={() => setIsMoveHover(true)}
                            onMouseLeave={() => setIsMoveHover(false)}
                        >
                            <div className='adbc w-full flex gap-[7px]'>
                                <GoMoveToEnd size={17} />
                                Move to...
                            </div>
                            <GoChevronRight size={17} />
                            {isMoveHover ?
                                <div className='automation__dropdown-sublist'>
                                    {automation.group ?
                                        <div
                                            className='automation__dropdown-sublist-item adbc'
                                            onClick={() => updateAutomation({ ...automation, group: false })}
                                        >
                                            <GoFileDirectory size={17} className='automation__dropdown-sublist-item__icon adbc' />
                                            All automations
                                        </div>
                                        : null}
                                    {groups.map((group, i) => {
                                        if (automation.group !== group.name) {
                                            return (
                                                <div
                                                    className='automation__dropdown-sublist-item adbc'
                                                    key={i}
                                                    onClick={() => updateAutomation({ ...automation, group: group.name })}
                                                >
                                                    <GoFileDirectory size={17} className='automation__dropdown-sublist-item__icon adbc' />
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
                    <Dropdown.Item className='vertical-dropdown__item automation__dropdown-item adbc'><GoLink size={17} />Bot link</Dropdown.Item>
                    <Dropdown.Item className='vertical-dropdown__item automation__dropdown-item adbc'><GoPeople size={17} />Clients</Dropdown.Item>
                    <Dropdown.Item className='vertical-dropdown__item automation__dropdown-item adbc'><SlSettings size={17} />Settings</Dropdown.Item>
                    <Dropdown.Divider className='adbc' />
                    <Dropdown.Item
                        className='vertical-dropdown__item automation__dropdown-item text-red-500 adbc'
                        onClick={() => deleteAutomation(automation.id)}
                    ><GoTrash color='red' size={17} />Delete</Dropdown.Item>
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
                        <div className='automation__content-main-value'>{automation.conversion}%</div>
                    </div>
                </div>
                <div className='automation__account'>
                    <div className='automation__account-icon'>
                        <img src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png" alt="account" />
                    </div>
                    <div className='automation__account-name'>@{automation.accountName}</div>
                </div>
            </div>
        </div>
    );
};

export default AutomationCard;