// Style
import './index.scss';

// Meta
import { Helmet } from "react-helmet-async";

import LoginForm from "../../../components/SignInForm";

const SignInPageLayout = () => {
    return (
        <div className="public-page sign-in-page">
            <Helmet>
                <meta name="description" content="signin croissant" />
                <title>Sign in - Croissant</title>
            </Helmet>
            <LoginForm/>
        </div>
    );
};

export default SignInPageLayout;