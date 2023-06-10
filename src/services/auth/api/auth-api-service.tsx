import { storageServices } from 'services/storage-service'
import { dashboardApiService } from 'store/dashboardApi'
import { authEndpoint } from './auth-endpoint'
import { history } from '../history'
const AuthApiService = dashboardApiService.injectEndpoints({
  endpoints(builder) {
    return {
      login: builder.mutation({
        query: (newData: any) => ({
          url: `${authEndpoint.login}`,
          method: 'POST',
          data: newData,
        }),
        async onQueryStarted(unknown, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled
            await storageServices.setItem('token', JSON.stringify(data?.token))
            await storageServices.setItem('user', JSON.stringify(data?.user))
            localStorage.setItem(
              'currentRole',
              JSON.stringify(data?.user?.roles[0]),
            )
            history.push('/dashboard')
            window.location.reload()
          } catch (error) {
            // history.push('/dashboard')
            // window.location.reload()
          }
        },
      }),
    }
  },
})

export const { useLoginMutation } = AuthApiService
