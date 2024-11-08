// Хуки
import { useEffect } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/state";
import { setAccessToken, setIsAuthenticated } from "../App/appSlice";

// Server
import { useRefreshTokenMutation } from "../../api/authenticationsSlice";

// Notifications
import toast from "react-hot-toast";

const TokenRefresher = () => {
    const dispatch = useAppDispatch();
    const [refreshToken] = useRefreshTokenMutation();
    const isAuthorized = useAppSelector((state) => state.appSlice.isAuthenticated);

    const refreshTokenValue = localStorage.getItem('refresh_token');

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (isAuthorized && refreshTokenValue) {
                await refreshToken(refreshTokenValue)
                .then((data) => {
                    localStorage.setItem("access_token", data.data!.access_token);
                    dispatch(setAccessToken(data.data!.access_token));
                    localStorage.setItem("refresh_token", data.data!.refresh_token);
                    localStorage.setItem("expires_in", `${data.data!.expires_in}`);
                    dispatch(setIsAuthenticated(true));
                }).catch((error) => {
                    console.error(error);
                    toast(error.data.error_description === "Invalid credentials given." ? 'E-mail or password are incorrect' : 'Oops! Something get wrong', {
                        icon: '😰'
                    });
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("expires_in");
                    localStorage.removeItem('remember');
                    dispatch(setAccessToken(null));
                    dispatch(setIsAuthenticated(false));
                });
            };
        }, 30000);

        return () => clearInterval(intervalId);
    }, []);

    return null;
};

export default TokenRefresher;