import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { configurationAuth0, configurationAzure, configurationGoogle, configurationIdentityServer, configurationOkta } from './Configurations';
import { OidcProvider, useOidc, useOidcAccessToken, useOidcIdToken, useOidcUser } from '@axa-fr/react-oidc';
import AuthenticatingError from './override/AuthenticateError';
import Authenticating from './override/Authenticating';
import Loading from './override/Loading';
import ServiceWorkerNotSupported from './override/ServiceWorkerNotSupported';
import SessionLost from './override/SessionLost';
import { useDispatch } from '../../store';
import { CallBackSuccess } from './override/Callback';

const MultiAuth = ({ configurationName, handleConfigurationChange, fname }: any) => {

    const navigate = useNavigate();
    const { login, logout, isAuthenticated } = useOidc(configurationName);

    const { idToken } = useOidcIdToken(configurationName);

    useEffect(() => {
        if (isAuthenticated) {
            if (idToken) {
                sessionStorage.accessToken = idToken;
            }
            sessionStorage.user = fname;
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated])

    return (
        <>
            {!isAuthenticated &&
                <div className="Auth-form-container">
                    <form className="Auth-form" >
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Sign In</h3>
                            <div className="form-group mt-3">
                                <label>Email address</label>
                                <input type="email"
                                    className="form-control mt-1"
                                    placeholder="Enter email"
                                    value={fname}
                                    onChange={handleConfigurationChange} />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <p><button type="button" className="btn btn-primary" onClick={() => {
                                    if (fname !== '' && (fname.split('@')[1] === 'hexaware.com' || fname.split('@')[1] === 'citibank.com' || fname.split('@')[1] === 'gmail.com')) {
                                        login()
                                    }
                                }}>Login</button></p>
                            </div>
                            <p className="forgot-password text-right mt-2">
                                Forgot <a href="#">password?</a>
                            </p>
                        </div>
                    </form>
                </div>}

            {isAuthenticated && <>
                <div className="Auth-logout-container">
                    <div>You Are Authenticated</div>
                    <div><p><button type="button" className="btn btn-primary" onClick={() => logout()}>Logout</button></p></div>
                </div>
            </>
            }

        </>
    );
};

if (!sessionStorage.configurationName) {
    sessionStorage.configurationName = 'config_classic';
}

const MultiAuthProvider = () => {
    const dispatch = useDispatch();

    const [isSessionLost, setIsSessionLost] = useState<boolean>(false);
    const [fname, setFname] = useState<string>('');
    const [domain, setDomain] = useState<string>('');
    const [configurationName, setConfigurationName] = useState<string>(sessionStorage.configurationName);
    const callBack = window.location.origin + '/multi-auth/authentification/callback2';
    const silent_redirect_uri = window.location.origin + '/multi-auth/authentification/silent-callback2';
    const configurations: any = {
        config_classic: {
            ...configurationIdentityServer,
            redirect_uri: callBack,
            silent_redirect_uri,
            scope: 'openid profile email api offline_access',
        },
        config_google: { ...configurationGoogle },
        config_auth0: { ...configurationAuth0 },
        config_okta: { ...configurationOkta },
        config_azure: { ...configurationAzure },
    };

    useEffect(() => {
        console.log(fname)
        if (fname.split('@')[1] === 'hexaware.com' || fname.split('@')[1] === 'citibank.com' || fname.split('@')[1] === 'gmail.com') {
            // const c = fname.split('@')[1]
            fetch(`http://localhost:4000/users/@${fname.split('@')[1]}/`)
                .then((result) => {
                    result.json().then((resp) => {
                        console.log(resp);
                        if (resp.config === 'configurationAuth0') {
                            const configurationName = 'config_auth0';
                            sessionStorage.configurationName = configurationName;
                            setConfigurationName(configurationName);
                        } else if (resp.config === 'configurationAzure') {
                            const configurationName = 'config_azure';
                            sessionStorage.configurationName = configurationName;
                            /* eslint-disable */
                            setConfigurationName(configurationName);
                        } else if (resp.config === 'configurationOkta') {
                            const configurationName = 'config_okta';
                            sessionStorage.configurationName = configurationName;
                            setConfigurationName(configurationName);
                        }
                    });
                });
        }
    }, [fname]);


    const handleConfigurationChange: any = (e: any) => {
        setFname(e.target.value);
    }
    // setDomain(fname.split('@')[1]);}

    const onSessionLost = () => {
        setIsSessionLost(true);
    };

    return (
        <>
            <OidcProvider configuration={configurations[configurationName]}
                configurationName={configurationName}
                loadingComponent={Loading}
                authenticatingErrorComponent={AuthenticatingError}
                authenticatingComponent={Authenticating}
                serviceWorkerNotSupportedComponent={ServiceWorkerNotSupported}
                callbackSuccessComponent={CallBackSuccess}
                onSessionLost={onSessionLost}
            >
                {isSessionLost && <SessionLost configurationName={configurationName} />}
                <MultiAuth configurationName={configurationName} handleConfigurationChange={handleConfigurationChange} fname={fname} domain={domain} />
                {/* <DisplayAccessToken configurationName={configurationName} /> */}
            </OidcProvider>
        </>
    );
};

export default MultiAuthProvider;