import { render } from '@testing-library/react'
import MessagingServices from 'shared/messaging-services'
import { dashboardApiService } from 'store/dashboardApi'
import { ConfigurationEndpoint } from './configuration-endpoint'

const ConfigurationApiService = dashboardApiService.injectEndpoints({
  endpoints(builder) {
    return {
      listConfiguration: builder.query({
        query: () => ({
          url: `${ConfigurationEndpoint.list}`,
          method: 'get',
          headers: '',
        }),
      }),
      updateConfiguration: builder.mutation({
        query: (updatedData: any) => ({
          url: `${ConfigurationEndpoint.update}`,
          method: 'post',
          data: updatedData,
          headers: '',
        }),
        async onQueryStarted(config, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled

            render(
              <MessagingServices
                message="Setting updated Successfully"
                show={true}
                type={'success'}
              />,
            )
          } catch (error) {
            render(
              <MessagingServices
                message="something wrong setting not updated"
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
  useListConfigurationQuery,
  useUpdateConfigurationMutation,
} = ConfigurationApiService
