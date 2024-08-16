import './index.scss';

import { Sidebar } from "flowbite-react";
import { HiChartPie } from "react-icons/hi";

import logo from './logo.svg';

const SidebarComponent = () => {
    return (
        <Sidebar>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item>
                        <img src={logo} alt="logo" className="sidebar__logo"/>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href='#' icon={HiChartPie}/>
                    <Sidebar.Item href='#' icon={HiChartPie}/>
                    <Sidebar.Item href='#' icon={HiChartPie}/>
                    <Sidebar.Item href='#' icon={HiChartPie}/>
                    <Sidebar.Item href='#' icon={HiChartPie}/>
                    <Sidebar.Item href='#' icon={HiChartPie}/>
                    <Sidebar.Item href='#' icon={HiChartPie}/>
                    <Sidebar.Item href='#' icon={HiChartPie}/>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default SidebarComponent;