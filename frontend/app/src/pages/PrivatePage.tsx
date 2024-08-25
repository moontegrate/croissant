// Стилистические компоненты
import './privatePage.scss';

import Spinner from '../components/Spinner';

// Маршрутизация
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import SidebarComponent from '../components/Sidebar';

const MainPageLayout = lazy(() => import("./layouts/main"));
const AutomationsPageLayout = lazy(() => import("./layouts/automations"));
const BuilderPageLayout = lazy(() => import("./layouts/builder"));

const PrivatePage = () => {
    return (
        <>
            <SidebarComponent />
            <Suspense
                fallback={
                    <div className="page-loading-spinner">
                        <Spinner />
                    </div>
                }
            >
                <Routes>
                    
                    <Route path="/" element={<MainPageLayout />} />
                    <Route path="/automations" element={<AutomationsPageLayout />} />
                    <Route path="/builder" element={<BuilderPageLayout />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default PrivatePage;