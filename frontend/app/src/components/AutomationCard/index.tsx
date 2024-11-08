// Style
import './index.scss';
import { verticalDropdownTheme } from '../../style/flowbiteThemes';
import { HiOutlinePower } from "react-icons/hi2";
import { SlSettings } from "react-icons/sl";
import { GoChevronRight, GoDuplicate, GoFileDirectory, GoLink, GoMoveToEnd, GoPeople, GoTrash } from "react-icons/go";

// Components
import { Dropdown } from 'flowbite-react';
import ToggleSwitch from '../ToggleSwitch';

// Interfaces
import { AutomationData } from '../../pages/layouts/automations/interfaces';

// Hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setAutomations, setAutomationSettingsState, setBotLinkData } from '../../pages/layouts/automations/automationsSlice';

// Server
import { useDeleteAutomationMutation, useGetAutomationsQuery, useUpdateAutomationMutation } from '../../api/apiSlice';

const AutomationCard: React.FC<{automation: AutomationData}> = ({automation}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        isLoading: isAutomationsLoading,
        refetch: refetchAutomations
    } = useGetAutomationsQuery();
    const [updateAutomation, { isLoading: isAutomationUpdating}] = useUpdateAutomationMutation();
    const [deleteAutomation] = useDeleteAutomationMutation();

    const [isMoveHover, setIsMoveHover] = useState(false);

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
                    <Dropdown.Item
                        className='vertical-dropdown__item automation__dropdown-item adbc'
                        onClick={() => {
                            updateAutomation({ ...automation, enabled: !automation.enabled })
                            .then(() => {
                                refetchAutomations().then((res) => {
                                    if (res.data) dispatch(setAutomations(res.data));
                                });
                            });
                        }}
                    >
                        <div className='adbc w-full flex gap-[7px]'>
                            <HiOutlinePower size={17} />
                            Turn on
                        </div>
                        <ToggleSwitch
                            disabled={isAutomationUpdating || isAutomationsLoading}
                            className='adbc'
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
                                <div className='sublist'>
                                    {automation.group ?
                                        <div
                                            className='sublist__item adbc'
                                            onClick={() => {
                                                updateAutomation({ ...automation, group: null });
                                                refetchAutomations();
                                            }}
                                        >
                                            <GoFileDirectory size={17} className='sublist__item__icon adbc' />
                                            All automations
                                        </div>
                                        : null}
                                    {groups.map((group, i) => {
                                        if (automation.group !== group.name) {
                                            return (
                                                <div
                                                    className='sublist__item adbc'
                                                    key={i}
                                                    onClick={() => {
                                                        updateAutomation({ ...automation, group: group.id });
                                                        refetchAutomations();
                                                    }}
                                                >
                                                    <GoFileDirectory size={17} className='sublist__item-icon adbc' />
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
                    <Dropdown.Item
                        className='vertical-dropdown__item automation__dropdown-item adbc'
                        onClick={() => {
                            dispatch(setBotLinkData({
                                id: automation.id,
                                name: automation.name,
                                channel: automation.channel
                            }));
                        }}
                    >
                        <GoLink size={17} />
                        Bot link
                    </Dropdown.Item>
                    <Dropdown.Item className='vertical-dropdown__item automation__dropdown-item adbc' onClick={() => navigate(`/automations/${automation.id}/clients/`)}><GoPeople size={17} />Clients</Dropdown.Item>
                    <Dropdown.Item className='vertical-dropdown__item automation__dropdown-item adbc' onClick={() => dispatch(setAutomationSettingsState({automation: automation}))}><SlSettings size={17} />Settings</Dropdown.Item>
                    <Dropdown.Divider className='adbc' />
                    <Dropdown.Item
                        className='vertical-dropdown__item automation__dropdown-item text-red-500 adbc'
                        onClick={() => deleteAutomation(automation.id).then(() => refetchAutomations())}
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
                        <img src={automation.accountIcon ? automation.accountIcon : '/account.svg'} alt="account" />
                    </div>
                    <div className='automation__account-name'>@{automation.accountName}</div>
                </div>
            </div>
        </div>
    );
};

export default AutomationCard;