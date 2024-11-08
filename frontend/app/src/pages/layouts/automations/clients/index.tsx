// Style
import './index.scss';
import { GoArrowLeft } from "react-icons/go";

// Hooks
import { useNavigate, useParams } from 'react-router-dom';

// Metadata
import { Helmet } from "react-helmet-async";

// Components
import SocialIcon from '../../../../components/SocialIcon';

// Server
import { useGetAutomationQuery } from '../../../../api/apiSlice';

// Redux
import { useAppSelector } from '../../../../hooks/state';

const ClientsPageLayout = () => {
    const navigate = useNavigate();
    const { automationId } = useParams();

    const isTokenReady = useAppSelector((state) => state.appSlice.isTokenReady);

    const {data: automation} = useGetAutomationQuery(`${automationId}`, {skip: !isTokenReady});

    return (
        <>
            <Helmet>
                <meta name="description" content="Croissant" />
                <title>Connect account</title>
            </Helmet>
            <div className='clients-page'>
                <header className='clients-page__header'>
                    <div className='clients-page__back' onClick={() => navigate('/automations/')}>
                        <GoArrowLeft color='gray' size={25}/>
                        Automations
                    </div>
                </header>
                <div className='clients-page__body'>
                    <div>
                        <div className='clients-page__target'>
                            <SocialIcon name={automation?.channel === 'Instagram' ? 'instagram' : 'telegram'} size={20}/>
                            <h2>{automation?.name}</h2>
                        </div>
                        <h1>Clients analytic</h1>
                        <span className='no-clients'>No clients yet.</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientsPageLayout;