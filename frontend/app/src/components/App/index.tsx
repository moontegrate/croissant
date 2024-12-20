// Style imports
import './index.scss';

// Components
import Spinner from '../Spinner';
import TokenRefresher from '../TokenRefresher';

// Routing
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Metadata
import { HelmetProvider } from "react-helmet-async";

// Notifications
import { Toaster } from "react-hot-toast";

// Notifications
import toast from 'react-hot-toast';

// Server
import { useRefreshTokenMutation } from '../../api/authenticationsSlice';

// Redux
import { useAppDispatch } from '../../hooks/state';
import { setAccessToken, setIsAuthenticated, setIsTokenReady } from './appSlice';

// Routing variables
const PrivatePage = lazy(() => import("../../pages/PrivatePage"));
const ConnectPageLayout = lazy(() => import("../../pages/layouts/automations/connect"));
const SignInPageLayout = lazy(() => import("../../pages/layouts/signIn"));

function App() {
    const [refreshToken] = useRefreshTokenMutation();

    const dispatch = useAppDispatch();

    const rememberMe = localStorage.getItem("remember");

    useEffect(() => {
        const refreshTokenValue = localStorage.getItem("refresh_token");

        function handleError() {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("expires_in");
            localStorage.removeItem('remember');
            dispatch(setAccessToken(null));
            dispatch(setIsAuthenticated(false));
            dispatch(setIsTokenReady(false));
        };

        if (rememberMe === "true") {
            refreshToken(refreshTokenValue!)
            .unwrap()
            .then((data) => {
                localStorage.setItem("access_token", data.access_token);
                dispatch(setAccessToken(data.access_token));
                dispatch(setIsTokenReady(true));
                localStorage.setItem("refresh_token", data.refresh_token);
                localStorage.setItem("expires_in", `${data.expires_in}`);
                dispatch(setIsAuthenticated(true));
            })
            .catch((error) => {
                console.error(error);
                toast(error.data.error_description === "Invalid credentials given." ? 'E-mail or password are incorrect' : 'Oops! Something get wrong', {
                    icon: '😰'
                });
                handleError();
            });
        } else {
            handleError();
        };
    }, []);

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
                            <Route path="/signin/" element={<SignInPageLayout />} />
                            <Route path="/automations/connect" element={<ConnectPageLayout />} />
                            <Route path="/*" element={<PrivatePage />} />
                        </Routes>
                    </Suspense>
                    <Toaster position='bottom-right'/>
                    <TokenRefresher/>
                </div>
            </HelmetProvider>
        </Router>
    );
}

export default App;
