import { render } from '@testing-library/react'
import MessagingServices from 'shared/messaging-services'
import { dashboardApiService } from 'store/dashboardApi'
import { userEndpoint } from './user-endpoint'

const UserApiService = dashboardApiService.injectEndpoints({
  endpoints(builder) {
    return {
      listUser: builder.query({
        query: () => ({
          url: `${userEndpoint.list}`,
          method: 'get',
        }),
      }),
      getByIdUser: builder.query({
        query: (id: string) => ({
          url: `${userEndpoint.detail}/${id}`,
          method: 'get',
        }),
      }),
      createUser: builder.mutation({
        query: (newData: any) => ({
          url: `${userEndpoint.create}`,
          method: 'post',
          data: newData,
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled

            render(
              <MessagingServices
                message="User Created Successfully"
                show={true}
                type={'success'}
              />,
            )
          } catch (error) {
            render(
              <MessagingServices
                message="something wrong user not created"
                show={true}
                type={'error'}
              />,
            )
          }
        },
      }),
      updateUser: builder.mutation({
        query: (updatedData: any) => ({
          url: `${userEndpoint.update}?user_id=${updatedData.id}`,
          method: 'put',
          data: updatedData,
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled
            render(
              <MessagingServices
                message="User Updated Successfully"
                show={true}
                type={'success'}
              />,
            )
          } catch (error) {
            render(
              <MessagingServices
                message="something wrong user not updated"
                show={true}
                type={'error'}
              />,
            )
          }
        },
      }),
      deleteUser: builder.mutation({
        query: (id: string) => ({
          url: `${userEndpoint.delete}`,
          method: 'delete',
        }),
      }),
    }
  },
})

export const {
  useListUserQuery,
  useGetByIdUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserApiService
