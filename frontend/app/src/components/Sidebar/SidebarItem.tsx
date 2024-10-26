// Style
import './index.scss';
import { verticalDropdownTheme } from '../../style/flowbiteThemes';

// Components
import { Dropdown } from 'flowbite-react';

// Interfaces
import { SidebarItemProps } from './interfaces';
import { ReactNode } from 'react';

// Hooks
import { useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setIsHamburgerClicked } from '../App/appSlice';

const SidebarItem: React.FC<SidebarItemProps> = ({
    children,
    icon,
    focused,
    onClick,
    dropdown
}) => {
    const dispatch = useAppDispatch();

    const isHamburgerClicked = useAppSelector((state) => state.appSlice.isHamburgerClicked);
    const [isItemHover, setIsItemHover] = useState<boolean | number>(false);

    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const target = e.target as HTMLDivElement;
        if (isHamburgerClicked) dispatch(setIsHamburgerClicked(false));
        if (onClick && !target.classList.contains('sdbbc')) {
            onClick();
        };
    };
    
    return (
        <div
            className={ focused? 'sidebar__item sidebar__item-focused' : focused === false ? 'sidebar__item sidebar__item-blur' : 'sidebar__item' }
            onClick={handleClick}
            onMouseEnter={() => setIsItemHover(true)}
            onMouseLeave={() => setIsItemHover(false)}
        >
            <div className='sidebar__item-container'>
                { icon ? <div className='sidebar__item-icon'>{icon}</div>  : null}
                { children }
            </div>
            { dropdown ?
                <Dropdown
                    theme={verticalDropdownTheme}
                    label=""
                    className='vertical-dropdown sdbbc'
                    dismissOnClick
                    renderTrigger={() => <button className='three-dots-menu sdbbc' style={{opacity: isItemHover ? 1 : 0}}>
                                        <span className='sdbbc'></span>
                                        <span className='sdbbc'></span>
                                        <span className='sdbbc'></span>
                                    </button>}
                >
                    {dropdown as ReactNode}
                </Dropdown>
            : null}
        </div>
    );
};

export default SidebarItem;