// Style
import './index.scss';
import logo from './logo.svg';
import { sidebarTheme, verticalDropdownTheme } from '../../style/flowbiteThemes';
import {
    GoChevronRight,
    GoCommentDiscussion,
    GoCreditCard,
    GoGear,
    GoGraph,
    GoPackage,
    GoPaperAirplane,
    GoPeople,
    GoPerson,
    GoPlay,
    GoQuestion,
    GoSignOut,
    GoTypography,
    GoWorkflow
} from "react-icons/go";

// Components
import { Dropdown, Sidebar } from "flowbite-react";

// Routing
import { useLocation, useNavigate } from 'react-router-dom';

// Hooks
import { useState } from 'react';

// Redux
import { useAppDispatch } from '../../hooks/state';
import { setIsAuthenticated } from '../App/appSlice';

const Navigation = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const iconSize = 25;
    const iconColor = "#545454";
    const mainColor = "#FF7A7A";

    const [isLanguageHover, setIsLanguageHover] = useState<boolean>(false);

    return (
        <Sidebar className='navigation' theme={sidebarTheme}>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <div className='navigation__logo' onClick={() => navigate('/')}>
                        <img src={logo} alt="logo"/>
                    </div>
                    <Sidebar.Item className={location.pathname === "/automations" ? "bg-gray-100" : ""} onClick={() => navigate('/automations')}><GoWorkflow size={iconSize} color={location.pathname === "/automations" ? mainColor : iconColor}/></Sidebar.Item>
                    <Sidebar.Item href='#'><GoPackage size={iconSize} color={iconColor}/></Sidebar.Item>
                    <Sidebar.Item href='#'><GoCommentDiscussion size={iconSize} color={iconColor}/></Sidebar.Item>
                    <Sidebar.Item href='#'><GoGraph size={iconSize} color={iconColor}/></Sidebar.Item>
                    <Sidebar.Item href='#'><GoPeople size={iconSize} color={iconColor}/></Sidebar.Item>
                    <Sidebar.Item href='#'><GoPaperAirplane size={iconSize} color={iconColor}/></Sidebar.Item>
                    <Sidebar.Item href='#'><GoPlay size={iconSize} color={iconColor}/></Sidebar.Item>
                    <Sidebar.Item href='#'><GoGear size={iconSize} color={iconColor}/></Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    {/* vertical dropdown class is in global index.scss */}
                    <Dropdown
                        label=''
                        theme={verticalDropdownTheme}
                        className='navigation__profile-dropdown vertical-dropdowm'
                        renderTrigger={() => <div className='navigation__profile'></div>}
                    >
                        <div className='vertical-dropdown__item navigation__profile-item'>
                            <div className='navigation__profile-image'>

                            </div>
                            <div className='navigation__profile-info'>
                                Name
                                <p className="navigation__profile-email">E-mail</p>
                            </div>
                        </div>
                        <Dropdown.Divider></Dropdown.Divider>
                        <Dropdown.Item className='vertical-dropdown__item'><GoPerson size={17}/>My account</Dropdown.Item>
                        <Dropdown.Item className='vertical-dropdown__item'><GoCreditCard size={17}/>Billing and plans</Dropdown.Item>
                        <Dropdown.Item className='vertical-dropdown__item'><GoPeople size={17}/>Partner cabinet</Dropdown.Item>
                        <Dropdown.Item
                            className='vertical-dropdown__item'
                            onMouseEnter={() => setIsLanguageHover(true)}
                            onMouseLeave={() => setIsLanguageHover(false)}
                        >
                            <div className='adbc w-full flex gap-[7px]'>
                                <GoTypography size={17}/>
                                Language
                            </div>
                            <GoChevronRight size={17}/>
                            {isLanguageHover ? 
                                <div className='sublist'>
                                    <div className='sublist__item'>English</div>
                                    <div className='sublist__item'>Русский</div>
                                </div>
                                : null
                            }
                        </Dropdown.Item>
                        <Dropdown.Item className='vertical-dropdown__item'><GoQuestion size={17}/>Help</Dropdown.Item>
                        <Dropdown.Item
                            className='vertical-dropdown__item'
                            onClick={() => {
                                dispatch(setIsAuthenticated(false));
                                localStorage.removeItem('remember');
                                navigate('/signin/');
                            }}
                        >
                            <GoSignOut size={17}/>Log out
                        </Dropdown.Item>
                    </Dropdown>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default Navigation;