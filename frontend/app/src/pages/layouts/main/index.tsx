import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import SidebarComponent from "../../../components/Sidebar";

const isAuthorized = true;

const MainPageLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthorized) {
            navigate('/signin');
        }
    // eslint-disable-next-line
    }, []);

    return (
        <div className="public-page main-page">
            <Helmet>
                <meta name="description" content="auto chat bot" />
                <title>Main page</title>
            </Helmet>
            <SidebarComponent/>
        </div>
    );
};

export default MainPageLayout;
