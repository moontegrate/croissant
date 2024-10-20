// Style
import './privatePage.scss';

// Routing
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Components
import Navigation from '../components/Navigation';
import Spinner from '../components/Spinner';

// Redux
import { useAppDispatch, useAppSelector } from '../hooks/state';
import { setIsHamburgerClicked } from '../components/App/appSlice';

// Page layouts
const AutomationsPageLayout = lazy(() => import("./layouts/automations"));
const BuilderPageLayout = lazy(() => import("./layouts/builder"));
const TemplatesPageLayout = lazy(() => import("./layouts/templates"));

const PrivatePage = () => {
    const dispatch = useAppDispatch();

    const isHamburgerClicked = useAppSelector((state) => state.appSlice.isHamburgerClicked);

    return (
        <div
            className='private-page'
            style={{
                transform: isHamburgerClicked ? 'translateX(324px)' : 'translateX(0)'
            }}
        >
            <Navigation />
            {isHamburgerClicked ? <div className='private-page__overlay' onClick={() => dispatch(setIsHamburgerClicked(false))}></div> : null}
            <Suspense
                fallback={
                    <div className="page-loading-spinner">
                        <Spinner />
                    </div>
                }
            >
                <Routes>
                    <Route path="/" element={<Navigate to="/automations" replace/>} />
                    <Route path="/automations" element={<AutomationsPageLayout />} />
                    <Route path="/builder/:automationId" element={<BuilderPageLayout />} />
                    <Route path="/templates" element={<TemplatesPageLayout />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default PrivatePage;