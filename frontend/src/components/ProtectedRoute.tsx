import { useAuthContext } from '@/hooks/useAuthContext'
import type { JSX } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'

const ProtectedRoute = ({
  redirectTo
}: {
  redirectTo: string
}): JSX.Element => {
  const { isAuthenticated, authIsLoading } = useAuthContext()

  if (authIsLoading) {
    return (
      <section className="flex h-full w-full items-center justify-center gap-2">
        <div>
          <p className="mb-2 text-2xl font-bold tracking-wide text-amber-900">
            Cargando
          </p>
          <LoadingSpinner
            isLoading={authIsLoading}
            cssClasses="w-10 h-10 border-t-amber-900 border-r-amber-900 border-b-amber-900"
          />
        </div>
      </section>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
