import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Global/Shared Sass
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import './assets/scss/main.scss'
import AppRoutes from 'App-routes'
import { userService } from 'services/auth/user-services'
import LoginForm from 'services/auth/component/lofin-form'
import { storageServices } from 'services/storage-service'

function App() {
  const lastItem = window.location.href.substring(
    window.location.href.lastIndexOf('/') + 1,
  )

  if (lastItem === 'login') {
    storageServices.clear()
  }
  const currentUser = userService.currentUser
  if (currentUser) {
    return <AppRoutes />
  } else {
    return <LoginForm />
  }
}

export default App
