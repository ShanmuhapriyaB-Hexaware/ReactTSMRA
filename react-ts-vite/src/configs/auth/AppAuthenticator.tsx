import { useOidcIdToken } from '@axa-fr/react-oidc';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from '../../store';

const AppAuthenticator = ({ children }: PropsWithChildren) => {
    const location = useLocation();
    const navigate = useNavigate();

    const { user, configname } = useSelector((store) => store.authSlice.auth);

    const { idToken } = useOidcIdToken()

    // useEffect(() => {
    //     const authenticated = checkUserAuthentication();
    //     if (authenticated) {
    //         if (location.pathname === '/login') navigate('/');
    //     } else {
    //         if (location.pathname !== '/login') navigate('/login');
    //     }
    // }, [location]);

    useEffect(() => {
        console.log(sessionStorage.getItem('configurationName'))
        console.log("Id Token :", idToken, configname)
    }, [idToken])

    function checkUserAuthentication(): boolean {
        return !!idToken;
    }

    return <>{children}</>;
};

export default AppAuthenticator;
