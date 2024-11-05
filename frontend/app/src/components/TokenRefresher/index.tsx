// Хуки
import { useEffect } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "../../hooks/state";
import { setIsAuthenticated } from "../App/appSlice";

// Server
import { useRefreshTokenMutation } from "../../api/authenticationsSlice";

const TokenRefresher = () => {
    const [refreshToken] = useRefreshTokenMutation();
    const isAuthorized = useAppSelector((state) => state.appSlice.isAuthenticated);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (isAuthorized) {
                await refreshToken('');
            }
        }, 30000);

        return () => clearInterval(intervalId);
    }, [refreshToken, isAuthorized]);

    return null;
};

export default TokenRefresher;