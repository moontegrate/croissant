import './index.scss';
import { MoonLoader } from 'react-spinners';

const Spinner = () => {
    return <div className="spinner">
        <MoonLoader color="#FF7A7A" size={40}/>
    </div>
};

export default Spinner;