// Style
import './index.scss';

// Interfaces
import { SidebarGroupProps } from './interfaces';

const SidebarGroup: React.FC<SidebarGroupProps> = ({ children, title, addButton }) => {
    return (
        <div className='sidebar__group'>
            { title ?
                <div className='sidebar__group-head'>
                    <h2 className='sidebar__group-title'>{title}</h2>
                    <div className='sidebar__group-btn'>{addButton}</div>
                </div>
            : null }
            <div className='sidebar__group-body'>{ children }</div>
        </div>
    );
};

export default SidebarGroup;