import './index.scss';

import { Sidebar } from "flowbite-react";
import { GoCommentDiscussion, GoGear, GoGraph, GoPackage, GoPaperAirplane, GoPeople, GoPlay, GoWorkflow } from "react-icons/go";

import logo from './logo.svg';

import { sidebarTheme } from '../../style/flowbiteThemes';

const SidebarComponent = () => {

    const iconSize = 25;
    const iconColor = "#545454";
    return (
        <Sidebar theme={sidebarTheme}>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <div className='sidebar__logo'>
                        <img src={logo} alt="logo"/>
                    </div>
                    <Sidebar.Item href='#'><GoWorkflow size={iconSize} color={iconColor}/></Sidebar.Item>
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

export default SidebarComponent;