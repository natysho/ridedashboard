import { dashboardApiService } from 'store/dashboardApi'
import { publicProviderEndpoint } from './public-provider-endpoint'

const PublicProviderApiService = dashboardApiService.injectEndpoints({
  endpoints(builder) {
    return {
      listPublicProvider: builder.query({
        query: () => ({
          url: `${publicProviderEndpoint.list}`,
          method: 'get',
        }),
      }),
      getPublicProviderById: builder.query({
        query: (id: string) => ({
          url: `${publicProviderEndpoint.detail}/${id}`,
          method: 'get',
        }),
      }),
    }
  },
})

export const {
  useListPublicProviderQuery,
  useGetPublicProviderByIdQuery,
} = PublicProviderApiService
