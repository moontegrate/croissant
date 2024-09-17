// Style imports
import './index.scss';
import { GoChevronLeft } from "react-icons/go";

// Hooks
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/state";

// Metadata
import { Helmet } from "react-helmet-async";

// Components
import InteractiveMap from "../../../components/InteractiveMap";
import NoteCardModal from '../../../components/NoteCardModal';

// Routing
import { useParams } from 'react-router-dom';

const BuilderPageLayout = () => {
    const { automationId } = useParams();
    const navigate = useNavigate();

    const isAuthenticated = useAppSelector((state) => state.appSlice.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
        }
    // eslint-disable-next-line
    }, []);

    return (
        <div className="public-page builder-page">
            <Helmet>
                <meta name="description" content="auto chat bot" />
                <title>Builder</title>
            </Helmet>
            <div className="builder-page__nav">
                <div className="builder-page__nav-btn" onClick={() => navigate('/automations')}>
                    <GoChevronLeft size={25}/>
                </div>
                <div className="builder-page__nav-info">
                    <div className="builder-page__nav-title">Map name</div>
                    <div className="builder-page__nav-subtitle">flow name</div>
                </div>
            </div>
            <NoteCardModal/>
            <InteractiveMap automationId={automationId!}/>
        </div>
    );
};

export default BuilderPageLayout;