import React, { Suspense } from 'react';
import LoadingButttons from './LoadingButtons';

const Loadable = (Component: React.FunctionComponent) => (props: any) => (
   <Suspense fallback={<LoadingButttons />}>
      <Component {...props} />
   </Suspense>
);

export default Loadable;