import { Helmet } from "react-helmet-async";

import LoginForm from "../../../components/LoginForm";

const SignInPageLayout = () => {
    return (
        <div className="public-page sign-in-page">
            <Helmet>
                <meta name="description" content="signin auto chat bot" />
                <title>Sign in - AutoChatBot</title>
            </Helmet>
            <LoginForm/>
        </div>
    );
};

export default SignInPageLayout;