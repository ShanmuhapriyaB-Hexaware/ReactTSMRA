import React, { ComponentType } from 'react';
import { style } from "./style"
import { useOidc } from "@axa-fr/react-oidc";

export const SessionLost = ({ configurationName }: any) => {
  const { login } = useOidc(configurationName);

  return (<>
    <div className="oidc-session-lost" style={style}>
      <div className="oidc-session-lost__container">
        <h1 className="oidc-session-lost__title">Session timed out for {configurationName}</h1>
        <p className="oidc-session-lost__content">
          Your session has expired. Please re-authenticate.
        </p>
        <button type="button" className="btn btn-primary" onClick={() => login(undefined)}>Login</button>
      </div>
    </div>
  </>)
};

export default SessionLost;
