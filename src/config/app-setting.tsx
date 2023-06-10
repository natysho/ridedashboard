export const applicationSetting: ApplicationSetting = {
  name: 'Safe Way',
  role: [
    {
      name: 'Admin',
      menu: [
        { name: 'Dashboard', url: '/dashboard' },
        { name: 'Registration', url: '/about' },
        { name: 'Users', url: '/users' },
        { name: 'Vehicle', url: '/public-vehicle' },
        { name: 'Driver', url: '/public-driver' },
        { name: 'Requests', url: '/requests' },
        { name: 'Driver Tracking', url: '/driver_tracking' },
        { name: 'Services', url: '/services' },
        { name: 'Notification', url: '/notification' },
        { name: 'Settings', url: '/settings' },
        { name: 'Feedback', url: '/feedback' },
      ],
    },
    {
      name: 'Operator',
      menu: [
        { name: 'Dashboard', url: '/dashboard' },
        // { name: 'Registration', url: '/about' },
        { name: 'Users', url: '/users' },
        { name: 'Vehicle', url: '/public-vehicle' },
        { name: 'Driver', url: '/public-driver' },
        { name: 'Requests', url: '/requests' },
        { name: 'Driver Tracking', url: '/driver_tracking' },
        { name: 'Services', url: '/services' },
        { name: 'Notification', url: '/notification' },
        { name: 'Settings', url: '/settings' },
        { name: 'Feedback', url: '/feedback' },
      ],
    },
  ],
}

export interface Menu {
  name: string
  url: string
}

export interface Role {
  name: string
  menu: Menu[]
}
export interface ApplicationSetting {
  name: string
  role: Role[]
}
