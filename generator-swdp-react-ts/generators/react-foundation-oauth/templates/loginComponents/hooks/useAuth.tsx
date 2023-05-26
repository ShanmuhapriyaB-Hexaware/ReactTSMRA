import { useState } from 'react';

function useAuth(): [() => void, boolean] {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    async function isUserAuthenticated() {
        setIsAuthenticated(false)
        if (sessionStorage['accessToken']) {
            setIsAuthenticated(true)
            return;
        };
        setIsAuthenticated(false)
    }

    return [isUserAuthenticated, isAuthenticated]

}

export default useAuth;
