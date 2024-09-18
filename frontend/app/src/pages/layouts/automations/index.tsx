// Style imports
import './index.scss';

// Metadata
import { Helmet } from "react-helmet-async";

// Hooks
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/state";

// Redux
import { useAppDispatch } from '../../../hooks/state';

// Components
import AutomationsSidebar from '../../../components/AutomationsSidebar';
import { BarLoader } from 'react-spinners';

// Server
import { useGetAutomationsQuery } from '../../../api/apiSlice';
import { setAutomations } from './automationsSlice';

const AutomationsPageLayout = () => {
    const {data = [],
        isFetching,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetAutomationsQuery();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useAppSelector((state) => state.appSlice.isAuthenticated);
    const automations = useAppSelector((state) => state.automationsSlice.automations);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
        };

        refetch();
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(setAutomations(data));
    }, [isLoading, isFetching]);

    return (
        <div className="public-page automations-page">
            <Helmet>
                <meta name="description" content="auto chat bot" />
                <title>Automations</title>
            </Helmet>
            <AutomationsSidebar/>
            <div className='automations-page__content'>
                {isLoading || isFetching ? <div className='loading-spinner'><BarLoader color='#FF7A7A' width="100%"/></div> : null}
                <h2 className='automations-page__title'>All automations <span>{automations.length}</span></h2>
                <div className='automations-page__grid'>
                    {automations.map((automation) => {
                        return (
                            <div className='automation' onClick={() => navigate(`/builder/${automation.id}`)}>
                                <div className='automation__top'>
                                    <div className='automation__info'>
                                        <span className={automation.enabled ? 'automation__status automation__status-enabled' : 'automation__status'}></span>
                                        <h4 className='automation__title'>{automation.name}</h4>
                                    </div>
                                    <div className='automation__menu-btn'>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                                <div className='automation__content'>
                                    <div className='automation__content-main'>
                                        <div>
                                            <div className='automation__content-main-title'>Users</div>
                                            <div className='automation__content-main-value'>{automation.users}</div>
                                        </div>
                                        <div>
                                            <div className='automation__content-main-title'>Conversion</div>
                                            <div className='automation__content-main-value'>{automation.conversion}</div>
                                        </div>
                                    </div>
                                    <div className='automation__account'>
                                        <div className='automation__account-icon'>
                                            <img src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png" alt="account" />
                                        </div>
                                        <div className='automation__account-name'>{automation.account}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AutomationsPageLayout;
