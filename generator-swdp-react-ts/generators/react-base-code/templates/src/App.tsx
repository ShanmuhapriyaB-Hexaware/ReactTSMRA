import './App.css'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary'
import routes from './configs/router/routes.config';
import ErrorFallback from './common/pages/Error'
import AppContext from './AppContext';

const GlobalRoutes = () => useRoutes(routes())

function App() {

  return (
    <AppContext.Provider value={{ routes }}>
      <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <GlobalRoutes />
        </ErrorBoundary>
      </Router>
    </AppContext.Provider>
  )
}

export default App
