// Style
import './index.scss';

// Interfaces
import { PageHeaderChildrenProps } from './interfaces';

// Components
import MenuButton from '../MenuButton';

const PageHeaderCore: React.FC<PageHeaderChildrenProps> = ({children}) => {
    return (
        <div className='page-header-core'>
            <MenuButton/>
            {children}
        </div>
    );
};

export default PageHeaderCore;