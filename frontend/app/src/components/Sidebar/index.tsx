// Style
import './index.scss';

// Interfaces
import { SidebarProps, SidebarGroupProps, SidebarItemProps } from './interfaces';

// Types
import { FC } from 'react';

// Components
import SidebarGroup from './SidebarGroup';
import SidebarItem from './SidebarItem';

const Sidebar: FC<SidebarProps> & { Group: FC<SidebarGroupProps>, Item: FC<SidebarItemProps> } = ({ children, title }) => {
    return (
        <div className='sidebar'>
            <h2 className='sidebar__title'>{title}</h2>
            <div className='sidebar__body'>{children}</div>
        </div>
    );
};

Sidebar.Group = SidebarGroup;
Sidebar.Item = SidebarItem;

export default Sidebar;