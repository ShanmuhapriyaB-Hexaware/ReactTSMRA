import './App.css'
import { useRoutes } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { AllPages } from './configs/routes.config'
import ErrorFallback from './common/page'

function App() {
  const all_pages = useRoutes(AllPages())
  return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {all_pages}
      </ErrorBoundary>
  )
}

export default App
