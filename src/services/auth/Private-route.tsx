import Dashboard from 'features/dashboard/pages/dashboard'
import { Navigate } from 'react-router-dom'
import Error404 from 'shared/component/error404'
import { userService } from './user-services'

interface Props {
  component: React.ComponentType
  path?: string
  roles?: Array<any>
}

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
  roles,
}) => {
  const user = userService.currentRole
  // const userRole = JSON.parse(userService.currentUser)
  const userHasRequiredRole = user && roles?.includes(user) ? true : false

  if (user && userHasRequiredRole) {
    return <RouteComponent />
  }

  if (user && !userHasRequiredRole) {
    return <Dashboard />
  } else {
    return <Error404 />
  }
}
