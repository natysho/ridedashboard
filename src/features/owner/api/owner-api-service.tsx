import { render } from '@testing-library/react'
import { Owner } from 'features/model/owner'
import MessagingServices from 'shared/messaging-services'
import { dashboardApiService } from 'store/dashboardApi'
import { ownerEndpoint } from './owner-endpoint'

const UserApiService = dashboardApiService.injectEndpoints({
  endpoints(builder) {
    return {
      listOwner: builder.query({
        query: () => ({
          url: `${ownerEndpoint.list}`,
          method: 'get',
        }),
      }),
      getOwnerById: builder.query({
        query: (id: string) => ({
          url: `${ownerEndpoint.detail}/${id}`,
          method: 'get',
        }),
      }),
      createOwner: builder.mutation({
        query: (newData: any) => ({
          url: `${ownerEndpoint.create}`,
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
      updateOwner: builder.mutation({
        query: (updatedData: Owner) => ({
          url: `${ownerEndpoint.update}?owner_id=${updatedData.id}`,
          method: 'post',
          data: updatedData,
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled

            render(
              <MessagingServices
                message="Owner updated successfully"
                show={true}
                type={'success'}
              />,
            )
          } catch (error) {
            render(
              <MessagingServices
                message="something wrong owner not updated"
                show={true}
                type={'error'}
              />,
            )
          }
        },
      }),
      deleteOwner: builder.mutation({
        query: (id: string) => ({
          url: `${ownerEndpoint.delete}`,
          method: 'delete',
        }),
      }),
    }
  },
})

export const {
  useListOwnerQuery,
  useGetOwnerByIdQuery,
  useCreateOwnerMutation,
  useUpdateOwnerMutation,
  useDeleteOwnerMutation,
} = UserApiService
