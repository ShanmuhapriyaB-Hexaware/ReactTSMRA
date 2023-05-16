import React, { PropsWithChildren, Suspense } from 'react'
import LoadingButttons from './LoadingButtons'

const ReactSuspense = ({ children }: PropsWithChildren) => {
    return <Suspense fallback={<LoadingButttons />}>{children}</Suspense>
}

export default ReactSuspense
