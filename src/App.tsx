import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import Loader from './components/layout/Loader'
import useDirection from './hooks/useDirection'
import routes from '~react-pages'

function App() {
  useDirection()

  return (
    <div className="w-full m-0 bg-gradient-to-b bg-primary-50 dark:to-slate-800 dark:from-primary-950 root">
      <Suspense fallback={<Loader />}>{useRoutes(routes)}</Suspense>
    </div>
  )
}

export default App
