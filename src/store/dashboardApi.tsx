import { createApi } from '@reduxjs/toolkit/query/react'
import { authHeaderService } from 'services/auth/auth-header'
import { axiosBaseQuery } from './axios.baseQuery'

export const dashboardApiService = createApi({
  reducerPath: 'dashboardApiService',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://safeway-api.herokuapp.com/api/',
    // baseUrl: 'http://localhost:5000/api/',
    auth: authHeaderService.getAuthHeader
      ? JSON.parse(authHeaderService.getAuthHeader)
      : '',
  }),
  endpoints: (builder) => ({}),
})
