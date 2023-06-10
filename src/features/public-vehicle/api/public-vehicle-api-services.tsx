import { dashboardApiService } from 'store/dashboardApi'
import { publicVehicleEndpoint } from './public-vehicle-endpoint'

const PublicVehicleApiService = dashboardApiService.injectEndpoints({
  endpoints(builder) {
    return {
      listPublicVehicle: builder.query({
        query: () => ({
          url: `${publicVehicleEndpoint.list}`,
          method: 'get',
        }),
      }),
      getPublicVehicleById: builder.query({
        query: (id: string) => ({
          url: `${publicVehicleEndpoint.detail}/${id}`,
          method: 'get',
        }),
      }),
      getPublicVehicleOwnerById: builder.query({
        query: (id: string) => ({
          url: `${publicVehicleEndpoint.detailOwner}/${id}`,
          method: 'get',
        }),
      }),
    }
  },
})

export const {
  useListPublicVehicleQuery,
  useGetPublicVehicleByIdQuery,
  useGetPublicVehicleOwnerByIdQuery,
} = PublicVehicleApiService
