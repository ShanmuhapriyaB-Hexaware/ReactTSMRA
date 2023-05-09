import * as React from 'react';
import {ComponentType } from "react";
import {style} from "./style";

const Loading = ({children, configurationName} : any) =>
{
  return (
    <>
      <span className="oidc-loading" style={style}>
    Loading for {configurationName}
  </span>
      </>
  )
} 
export default Loading;
