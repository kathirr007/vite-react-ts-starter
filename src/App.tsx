import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import useDirection from './hooks/useDirection'
import routes from '~react-pages'

function App() {
  useDirection()

  return (
    <div className="w-full m-0 root">
      <Suspense fallback={<LayoutLoader />}>{useRoutes(routes)}</Suspense>
    </div>
  )
}

export default App
