// Style imports
import './index.scss';
import { GoChevronLeft } from "react-icons/go";

// Hooks
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Metadata
import { Helmet } from "react-helmet-async";

// Components
import InteractiveMap from "../../../components/InteractiveMap";

// Redux
import { useAppSelector } from '../../../hooks/state';

const BuilderPageLayout = () => {
    const navigate = useNavigate();

    const automation = useAppSelector((state) => state.interactiveMapSlice.automationName);

    return (
        <div className="public-page builder-page">
            <Helmet>
                <meta name="description" content="auto chat bot" />
                <title>Builder</title>
            </Helmet>
            <div className="builder-page__nav">
                <button className="builder-page__nav-btn" onClick={() => navigate('/automations')}>
                    <GoChevronLeft size={25}/>
                </button>
                <div className="builder-page__nav-info">
                    <div className="builder-page__nav-title">{automation}</div>
                    <div className="builder-page__nav-subtitle">flow name</div>
                </div>
            </div>
            <InteractiveMap/>
        </div>
    );
};

export default BuilderPageLayout;