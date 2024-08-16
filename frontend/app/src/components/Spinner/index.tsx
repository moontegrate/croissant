import './spinner.scss';
import { InfinitySpin } from "react-loader-spinner";

const Spinner = () => {
    return <div className="spinner">
        <InfinitySpin color="#DDB46F" />
    </div>
};

export default Spinner;