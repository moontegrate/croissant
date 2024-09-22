import './index.scss';

import { Sidebar } from "flowbite-react";
import { GoCommentDiscussion, GoGear, GoGraph, GoPackage, GoPaperAirplane, GoPeople, GoPlay, GoWorkflow } from "react-icons/go";

import logo from './logo.svg';

import { sidebarTheme } from '../../style/flowbiteThemes';
import { useLocation, useNavigate } from 'react-router-dom';

const MainNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const iconSize = 25;
    const iconColor = "#545454";
    const mainColor = "#FF7A7A"
    return (
        <Sidebar theme={sidebarTheme}>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <div className='sidebar__logo' onClick={() => navigate('/')}>
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
                    <div className='sidebar__profile'>

                    </div>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default MainNavigation;