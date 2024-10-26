// Style imports
import './index.scss';

// Components
import Spinner from '../Spinner';

// Routing
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Metadata
import { HelmetProvider } from "react-helmet-async";

// Notifications
import { Toaster } from "react-hot-toast";

// Routing variables
const PublicPage = lazy(() => import("../../pages/PublicPage"));
const PrivatePage = lazy(() => import("../../pages/PrivatePage"));
const ConnectPageLayout = lazy(() => import("../../pages/layouts/automations/connect"));

function App() {
    return (
        <Router>
            <HelmetProvider>
                <div className="App">
                    <Suspense
                        fallback={
                            <Spinner />
                        }
                    >
                        <Routes>
                            <Route path="/signin" element={<PublicPage />} />
                            <Route path="/automations/connect" element={<ConnectPageLayout />} />
                            <Route path="/*" element={<PrivatePage />} />
                        </Routes>
                    </Suspense>
                    <Toaster />
                </div>
            </HelmetProvider>
        </Router>
    );
}

export default App;
