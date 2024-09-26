// Стилистические компоненты
import './privatePage.scss';

import Spinner from '../components/Spinner';

// Маршрутизация
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from '../components/Navigation';

const MainPageLayout = lazy(() => import("./layouts/main"));
const AutomationsPageLayout = lazy(() => import("./layouts/automations"));
const BuilderPageLayout = lazy(() => import("./layouts/builder"));
const TemplatesPageLayout = lazy(() => import("./layouts/templates"));

const PrivatePage = () => {
    return (
        <>
            <Navigation />
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
                    <Route path="/builder/:automationId" element={<BuilderPageLayout />} />
                    <Route path="/templates" element={<TemplatesPageLayout />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default PrivatePage;