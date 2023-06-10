import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Features Pages
import Dashboard from './features/dashboard/pages/dashboard'
import Owner from './features/owner/pages/owner'
import AcceptedRequests from './features/requests/pages/accepted_requests'
import StartedRequests from './features/requests/pages/started_requests'
import CompletedRequests from './features/requests/pages/completed_requests'
import DriverCanceledRequests from './features/requests/pages/driver_canceled_requests'
import PassengerCanceledRequests from './features/requests/pages/passenger_canceled_requests'
import ProviderTracking from './features/provider_tracking/pages/provider_tracking'
import Services from './features/services/pages/services'
import Provider from './features/provider/pages/provider'
import Vehicle from './features/vehicle/pages/vehicle'
import PromoCodes from './features/settings/pages/promo_codes'
import PushNotification from './features/settings/pages/push_notification'
import Notification from './features/notification/pages/notification'

// Global/Shared Sass
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import './assets/scss/main.scss'
import NewProvider from './features/provider/continer/new-provider'
import ProviderDetail from './features/provider/pages/provider-detail'
import ProviderList from './features/provider/pages/provider-list'
import NewOwner from 'features/owner/container/new-owner'
import VehicleList from 'features/vehicle/pages/vehicle-list'
import NewVehicle from 'features/vehicle/container/new-vehicle'
import VehicleDetail from 'features/vehicle/pages/vehicle-detail'
import VehicleOwnerList from 'features/vehicle/pages/vehicle-owner-list'
import ProviderOwnerList from 'features/provider/pages/provider-owner-list'
import ProviderVehicle from 'features/provider/pages/provider-vehicle'
import OwnerDetail from 'features/owner/pages/owner-detail'
import OwnerList from 'features/owner/pages/owner-list'
import UserList from 'features/users/pages/user-list'
import User from 'features/users/pages/user'
import NewUser from 'features/users/container/new-user'
import UserDetail from 'features/users/pages/user-detail'
import Error404 from 'shared/component/error404'
import PublicProvider from 'features/public-provider/pages/public-providex'
import PublicProviderList from 'features/public-provider/pages/public-provider-list'
import PublicProviderDetail from 'features/public-provider/pages/public-provider-detail'
import PublicVehicle from 'features/public-vehicle/pages/public-vehicle'
import PublicVehicleList from 'features/public-vehicle/pages/public-vehicle-list'
import PublicVehicleDetail from 'features/public-vehicle/pages/public-vehicle-detail'
import LoginForm from 'services/auth/component/lofin-form'
import { PrivateRoute } from 'services/auth/Private-route'
import Configuration from 'features/settings/pages/configuration'
import PublicVehicleLandingPage from 'features/public-vehicle/pages/public-vehicle-landing-page'
import { ROLES } from 'features/model/role'
import ConfigurationForm from 'features/settings/component/configuration-form'
import PublicProviderLandingPage from 'features/public-provider/pages/public-provider-landing-page'
import Feedback from 'features/feedback/pages/feedback'
import FeedbackList from 'features/feedback/pages/feedback-list'
import FeedbackDetail from 'features/feedback/pages/feedback-detail'

function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginForm />} />

      <Route index element={<PrivateRoute component={Dashboard} />} />
      <Route
        path="/dashboard"
        element={<PrivateRoute component={Dashboard} />}
      />
      <Route
        path="/owner"
        element={<PrivateRoute roles={[ROLES.Admin]} component={Owner} />}
      >
        <Route index element={<OwnerList />} />
        <Route path="/owner/new" element={<NewOwner />} />
        <Route path="/owner/detail/:id" element={<OwnerDetail />} />
      </Route>
      {/* 
      <Route path="/owner" element={<Owner />}>
        <Route index element={<OwnerList />} />
        <Route path="/owner/new" element={<NewOwner />} />
        <Route path="/owner/detail/:id" element={<OwnerDetail />} />
      </Route> */}

      <Route path="/users" element={<User />}>
        <Route index element={<UserList />} />
        <Route path="/users/new" element={<NewUser />} />
        <Route path="/users/detail/:id" element={<UserDetail />} />
      </Route>

      <Route path="/public-driver" element={<PublicProvider />}>
        <Route index element={<PublicProviderList />} />
        <Route
          path="public-driver-detail/:id"
          element={<PublicProviderLandingPage />}
        />
      </Route>

      <Route path="/public-vehicle" element={<PublicVehicle />}>
        <Route index element={<PublicVehicleList />} />
        <Route
          path="public-vehicle-detail/:id"
          element={<PublicVehicleLandingPage />}
        />
      </Route>

      <Route
        path="/requests/accepted_requests"
        element={<AcceptedRequests />}
      />
      <Route path="/requests/started_requests" element={<StartedRequests />} />
      <Route
        path="/requests/completed_requests"
        element={<CompletedRequests />}
      />
      <Route
        path="/requests/driver_canceled_requests"
        element={<DriverCanceledRequests />}
      />
      <Route
        path="/requests/passenger_canceled_requests"
        element={<PassengerCanceledRequests />}
      />
      <Route path="/driver_tracking" element={<ProviderTracking />} />
      <Route path="/services" element={<Services />} />

      <Route
        path="/driver"
        element={<PrivateRoute roles={[ROLES.Admin]} component={Provider} />}
      >
        <Route index element={<ProviderOwnerList />} />
        <Route path="owner-detail/:id" element={<ProviderVehicle />} />
        <Route
          path="owner-detail/:id/vehicle-detail/:id"
          element={<ProviderList />}
        />
        <Route
          path="owner-detail/:id/vehicle-detail/:id/driver-detail/:id"
          element={<ProviderDetail />}
        />
        <Route
          path="owner-detail/:id/vehicle-detail/:id/driver/new"
          element={<NewProvider />}
        />
      </Route>

      <Route
        path="/vehicle"
        element={<PrivateRoute roles={[ROLES.Admin]} component={Vehicle} />}
      >
        <Route index element={<VehicleOwnerList />} />
        <Route path="owner-detail/:id" element={<VehicleList />}></Route>
        <Route path="owner-detail/:id/vehicle/new" element={<NewVehicle />} />
        <Route
          path="owner-detail/:id/vehicle/detail/:id"
          element={<VehicleDetail />}
        />
      </Route>
      <Route path="/notification" element={<Notification />} />

      <Route path="/settings/promo_codes" element={<PromoCodes />} />
      <Route
        path="/settings/push_notification"
        element={<PushNotification />}
      />
      <Route path="/settings/configuration" element={<Configuration />} />
      <Route path="*" element={<Error404 />} />

      <Route path="/feedback" element={<Feedback />}>
        <Route index element={<FeedbackList />} />
        <Route path="/feedback/detail/:id" element={<FeedbackDetail />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
