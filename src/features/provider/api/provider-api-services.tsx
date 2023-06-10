import { render } from '@testing-library/react'
import MessagingServices from 'shared/messaging-services'
import { dashboardApiService } from '../../../store/dashboardApi'
import { providerEndpoint } from './provider-endpoint'

export const ProviderApiService = dashboardApiService.injectEndpoints({
  endpoints(builder) {
    return {
      listProvider: builder.query({
        query: () => ({
          url: `${providerEndpoint.list}`,
          method: 'get',
        }),
      }),
      getProviderById: builder.query({
        query: (id: string) => ({
          url: `${providerEndpoint.detail}/${id}`,
          method: 'get',
        }),
      }),
      createProvider: builder.mutation({
        query: (newData: any) => ({
          url: `${providerEndpoint.create}`,
          method: 'post',
          data: newData,
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled

            render(
              <MessagingServices
                message="Owner Created Successfully"
                show={true}
                type={'success'}
              />,
            )
          } catch (error) {
            render(
              <MessagingServices
                message="something wrong owner not created"
                show={true}
                type={'error'}
              />,
            )
          }
        },
      }),
      updateProvider: builder.mutation({
        query: (updatedData: any) => ({
          url: `${providerEndpoint.update}?driver_id=${updatedData.id}`,
          method: 'post',
          data: updatedData,
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled

            render(
              <MessagingServices
                message="provider Updated Successfully"
                show={true}
                type={'success'}
              />,
            )
          } catch (error) {
            render(
              <MessagingServices
                message="something wrong provider not Updated"
                show={true}
                type={'error'}
              />,
            )
          }
        },
      }),
      deleteProvider: builder.query({
        query: (id: string) => ({
          url: `${providerEndpoint.delete}`,
          method: 'delete',
        }),
      }),
      listVehicleOwnerProvider: builder.query({
        query: () => ({
          url: `${providerEndpoint.listOwner}`,
          method: 'get',
        }),
      }),
      getVehicleOwnerProviderById: builder.query({
        query: (id: string) => ({
          url: `${providerEndpoint.getOwnerById}/${id}`,
          method: 'get',
        }),
      }),
      listVehicleProvider: builder.query({
        query: () => ({
          url: `${providerEndpoint.listVehicle}`,
          method: 'get',
        }),
      }),
      getVehicleProviderById: builder.query({
        query: (id: string) => ({
          url: `${providerEndpoint.getVehicleById}/${id}`,
          method: 'get',
        }),
      }),

      uploadProviderPassport: builder.mutation({
        query: (updatedData: any) => ({
          url: `${providerEndpoint.uploadDocument}?driver_id=${updatedData.driver_id}`,
          method: 'post',
          data: updatedData.file,
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled

            render(
              <MessagingServices
                message="Passport Uploaded Successfully"
                show={true}
                type={'success'}
              />,
            )
          } catch (error) {
            render(
              <MessagingServices
                message="something wrong Passport not Uploaded"
                show={true}
                type={'error'}
              />,
            )
          }
        },
      }),
    }
  },
})

export const {
  useListProviderQuery,
  useGetProviderByIdQuery,
  useCreateProviderMutation,
  useUpdateProviderMutation,
  useDeleteProviderQuery,
  useGetVehicleOwnerProviderByIdQuery,
  useListVehicleOwnerProviderQuery,
  useGetVehicleProviderByIdQuery,
  useListVehicleProviderQuery,
  useUploadProviderPassportMutation,
} = ProviderApiService
