// Стилистические компоненты
import './publicPage.scss';

import Spinner from '../components/Spinner';

// Маршрутизация
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const MainPageLayout = lazy(() => import("./layouts/main"));
const SignInPageLayout = lazy(() => import("./layouts/signIn"));

const PublicPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="page-loading-spinner">
            <Spinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<MainPageLayout />} />
          <Route path="/signin" element={<SignInPageLayout />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default PublicPage;
