import { OidcProvider, useOidc, useOidcIdToken } from '@axa-fr/react-oidc';
import { PropsWithChildren, useEffect, useState } from 'react';
import { configurationAuth0, configurationAzure, configurationGoogle, configurationIdentityServer, configurationOkta } from './Configurations';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../store';
import useAuth from '../hooks/useAuth';
import { setAuth } from './store/auth.slice';

const AppAuthenticator = ({ children }: PropsWithChildren) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isUserAuthenticated, isAuthenticated] = useAuth()

    useEffect(() => {
        isUserAuthenticated();
        if (isAuthenticated) {
            dispatch(setAuth(sessionStorage['user']))
        }
    })

    useEffect(() => {
        isUserAuthenticated();
        if (isAuthenticated) {
            if (location.pathname === '/login') navigate('/');
        } else {
            if (location.pathname !== '/login') navigate('/login');
        }
    }, [location])

    return <>
        {children}
    </>;
};

export default AppAuthenticator;
