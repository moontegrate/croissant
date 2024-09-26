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
import NoteCardModal from '../../../components/NoteCardModal';

// Redux
import { useAppSelector } from '../../../hooks/state';

const BuilderPageLayout = () => {
    const navigate = useNavigate();

    const isAuthenticated = useAppSelector((state) => state.appSlice.isAuthenticated);
    const automation = useAppSelector((state) => state.interactiveMapSlice.automationName);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
        };
    // eslint-disable-next-line
    }, []);

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
            <NoteCardModal/>
            <InteractiveMap/>
        </div>
    );
};

export default BuilderPageLayout;