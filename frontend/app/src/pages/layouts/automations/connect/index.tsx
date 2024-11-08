// Style
import './index.scss';
import logo from '../../../../components/Navigation/logo.svg';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

// Routing
import { useNavigate } from 'react-router-dom';

// Metadata
import { Helmet } from "react-helmet-async";

// Components
import SocialIcon from '../../../../components/SocialIcon';

const ConnectPageLayout = () => {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <meta name="description" content="Croissant" />
                <title>Connect account</title>
            </Helmet>
            <div className='connect-page'>
                <div className='connect-page__info'>
                    <div className='connect-page__info-container'>
                        <img src={logo} alt='logo' className='logo' onClick={() => navigate('/')}/>
                        <div className='connect-page__info-message'>
                            <h2>Select channel</h2>
                            <span>Connect account / bot to create automations</span>
                        </div>
                        <div className='connect-page__info-bottom' onClick={() => navigate('/')}>
                            <GoArrowLeft color='gray' size={25}/>
                            Back
                        </div>
                    </div>
                </div>
                <div className="connect-page__answer">
                    <button className='connect-page__answer-btn'>
                        <div className='connect-page__answer-btn-icon'>
                            <SocialIcon name='instagram' size={30}/>
                        </div>
                        <div className='connect-page__answer-btn-body'>
                            <p className='connect-page__answer-btn-title'>Instagram</p>
                            <span>Connect your Instagram account</span>
                        </div>
                        <GoArrowRight size={25} color='gray'/>
                    </button>
                    <button className='connect-page__answer-btn'>
                        <div className='connect-page__answer-btn-icon'>
                            <SocialIcon name='telegram' size={30}/>
                        </div>
                        <div className='connect-page__answer-btn-body'>
                            <p className='connect-page__answer-btn-title'>Telegram</p>
                            <span>Connect your Telegram bot</span>
                        </div>
                        <GoArrowRight size={25} color='gray'/>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ConnectPageLayout;