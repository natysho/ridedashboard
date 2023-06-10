import { render } from '@testing-library/react'
import MessagingServices from 'shared/messaging-services'
import { dashboardApiService } from 'store/dashboardApi'
import { vehicleEndpoint } from './vehicle-endpoint'

const VehicleApiService = dashboardApiService.injectEndpoints({
  endpoints(builder) {
    return {
      listVehicle: builder.query({
        query: () => ({
          url: `${vehicleEndpoint.list}`,
          method: 'get',
        }),
      }),
      getVehicleById: builder.query({
        query: (id: string) => ({
          url: `${vehicleEndpoint.detail}/${id}`,
          method: 'get',
        }),
      }),
      createVehicle: builder.mutation({
        query: (newData: any) => ({
          url: `${vehicleEndpoint.create}`,
          method: 'post',
          data: newData,
        }),
        async onQueryStarted(auth, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled

            render(
              <MessagingServices
                show={true}
                type="success"
                message="Vehicle created successfully"
              />,
            )
          } catch (ex) {
            // console.log('error...', ex.error.status)
            render(
              <MessagingServices
                show={true}
                type="error"
                message="Vehicle not created "
              />,
            )
          }
        },
      }),
      updateVehicle: builder.mutation({
        query: (updatedData: any) => ({
          url: `${vehicleEndpoint.update}?vehicle_id=${updatedData.id}`,
          method: 'post',
          data: updatedData,
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled

            render(
              <MessagingServices
                message="Vehicle updated successfully"
                show={true}
                type={'success'}
              />,
            )
          } catch (error) {
            render(
              <MessagingServices
                message="Something wrong Vehicle not updated"
                show={true}
                type={'error'}
              />,
            )
          }
        },
      }),
      deleteVehicle: builder.mutation({
        query: (id: string) => ({
          url: `${vehicleEndpoint.delete}`,
          method: 'delete',
        }),
      }),

      listVehicleOwner: builder.query({
        query: () => ({
          url: `${vehicleEndpoint.listOwner}`,
          method: 'get',
        }),
      }),
      getVehicleOwnerById: builder.query({
        query: (id: string) => ({
          url: `${vehicleEndpoint.getOwnerById}/${id}`,
          method: 'get',
        }),
      }),

      uploadVehicleDocument: builder.mutation({
        query: (updatedData: any) => ({
          url: `${vehicleEndpoint.uploadDocument}?vehicle_id=${updatedData.vehicle_id}`,
          method: 'post',
          data: updatedData.file,
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled

            render(
              <MessagingServices
                message="Document Uploaded Successfully"
                show={true}
                type={'success'}
              />,
            )
          } catch (error) {
            render(
              <MessagingServices
                message="something wrong Document not Uploaded"
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
  useListVehicleQuery,
  useGetVehicleByIdQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
  useGetVehicleOwnerByIdQuery,
  useListVehicleOwnerQuery,
  useUploadVehicleDocumentMutation,
} = VehicleApiService
