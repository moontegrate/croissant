// Style imports
import './index.scss';

// Components
import { HiOutlineMenu } from "react-icons/hi";

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { setIsHamburgerClicked } from '../App/appSlice';

const MenuButton = () => {
    const dispatch = useAppDispatch();

    const isHamburgerClicked = useAppSelector((state) => state.appSlice.isHamburgerClicked);

    return (
        <div
            className="menu-button"
            onClick={() => dispatch(setIsHamburgerClicked(!isHamburgerClicked))}
        >
            <HiOutlineMenu size={25}/>
        </div>
    );
};

export default MenuButton;