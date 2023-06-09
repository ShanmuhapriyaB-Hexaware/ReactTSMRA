import './App.css'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary'
import { Provider as ReduxProvider } from 'react-redux';
import routes from './configs/router/routes.config';
import ErrorFallback from './common/pages/Error'
import AppContext from './AppContext';
import store from './store';
import { OidcProvider } from '@axa-fr/react-oidc';
import { configurationIdentityServer } from './configs/auth/Configurations';

const GlobalRoutes = () => useRoutes(routes())

function App() {

  return (
    <ReduxProvider store={store}>
      <OidcProvider configuration={configurationIdentityServer} >
        <AppContext.Provider value={{ routes }}>
          <Router>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <GlobalRoutes />
            </ErrorBoundary>
          </Router>
        </AppContext.Provider>
      </OidcProvider>
    </ReduxProvider>
  )
}

export default App
