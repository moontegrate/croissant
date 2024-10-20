// Style
import './index.scss';

// Components
import PageHeaderCore from './PageHeaderCore';
import PageHeaderExtensions from './PageHeaderExtensions';

// Interfaces
import { PageHeaderChildrenProps } from './interfaces';

const PageHeader: React.FC<PageHeaderChildrenProps> & { Core: React.FC<PageHeaderChildrenProps>, Extensions: React.FC<PageHeaderChildrenProps>} = ({children}) => {
    return (
        <header className='page-header'>
            {children}
        </header>
    );
};

PageHeader.Core = PageHeaderCore;
PageHeader.Extensions = PageHeaderExtensions;

export default PageHeader;