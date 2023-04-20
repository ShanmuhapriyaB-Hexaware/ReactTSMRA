import React from 'react'

const ErrorFallback = () => {
    return (
        <div>
            <img src="/assets/images/illustrations/designer.svg" alt="" />
            <h1>Something Went Wrong</h1>
            <h4>Contact Administrator</h4>
            <a href='/'>
                Back to Home
            </a>
        </div>
    )
}

export default ErrorFallback
