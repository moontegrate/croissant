import './index.scss';

import Spinner from '../Spinner';

// Routing
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Metadata
import { HelmetProvider } from "react-helmet-async";

// Notifications
import { Toaster } from "react-hot-toast";

const PublicPage = lazy(() => import("../../pages/PublicPage"));

function App() {
    return (
        <Router>
            <HelmetProvider>
                <div className="App">
                    {/* Компонент для обновления токенов */}
                    <Suspense
                        fallback={
                            <Spinner />
                        }
                    >
                        <Routes>
                            <Route path="/*" element={<PublicPage />} />
                        </Routes>
                    </Suspense>

                    {/* Компонент для размещения уведолений */}
                    <Toaster />
                </div>
            </HelmetProvider>
        </Router>
    );
}

export default App;
