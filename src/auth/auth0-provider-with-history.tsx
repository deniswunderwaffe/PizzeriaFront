import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
    const history = useHistory();
    const domain:string = "dev-ee0ukytx.us.auth0.com";
    const clientId:string = "QyCQuRzOiapn1Bp9pluZC9TNfaDP50Kq";
    const audience = "https://pizzeria/api"

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            audience={audience}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;