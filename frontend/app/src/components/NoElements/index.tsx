// Style imports
import './index.scss';

// Interfaces
import { NoElementsProps } from './interfaces';

const NoElements:React.FC<NoElementsProps> = ({text, description}) => {
    return (
        <div className="no-elements">
            <p className='no-elements__text'>{text}</p>
            <span className='no-elements__description'>{description}</span>
        </div>
    );
};

export default NoElements;