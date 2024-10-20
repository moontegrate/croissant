// Style
import './index.scss';

// Interfaces
import { PageHeaderChildrenProps } from './interfaces';

const PageHeaderExtensions: React.FC<PageHeaderChildrenProps> = ({children}) => {
    return (
        <div className='page-header-extensions'>
            {children}
        </div>
    );
};

export default PageHeaderExtensions;