// Стилистические компоненты
import './privatePage.scss';

import Spinner from '../components/Spinner';

// Маршрутизация
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import SidebarComponent from '../components/Sidebar';

const MainPageLayout = lazy(() => import("./layouts/main"));

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
                </Routes>
            </Suspense>
        </>
    );
};

export default PrivatePage;