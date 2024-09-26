import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/state";

const MainPageLayout = () => {
    const navigate = useNavigate();

    const isAuthenticated = useAppSelector((state) => state.appSlice.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
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
        </div>
    );
};

export default MainPageLayout;
