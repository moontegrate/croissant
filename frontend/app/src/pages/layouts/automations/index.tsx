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

// Server
import { useGetAutomationsQuery } from '../../../api/apiSlice';
import { setAutomations } from './automationsSlice';

const AutomationsPageLayout = () => {
    const {data = [],
        isFetching,
        isLoading: isAutomationsLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetAutomationsQuery();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useAppSelector((state) => state.appSlice.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
        };


    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(setAutomations(data));
    }, [isAutomationsLoading]);

    return (
        <div className="public-page automations-page">
            <Helmet>
                <meta name="description" content="auto chat bot" />
                <title>Automations</title>
            </Helmet>
            <AutomationsSidebar/>
        </div>
    );
};

export default AutomationsPageLayout;
