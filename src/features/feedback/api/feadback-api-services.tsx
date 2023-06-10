import { render } from '@testing-library/react'
import MessagingServices from 'shared/messaging-services'
import { dashboardApiService } from 'store/dashboardApi'
import { FeedbackEndpoint } from './feedback-endpoint'

const FeedbackApiService = dashboardApiService.injectEndpoints({
  endpoints(builder) {
    return {
      listFeedback: builder.query({
        query: () => ({
          url: `${FeedbackEndpoint.list}`,
          method: 'get',
          headers: '',
        }),
      }),
      detailFeedback: builder.query({
        query: (id: string) => ({
          url: `${FeedbackEndpoint.detail}/${id}`,
          method: 'get',
          headers: '',
        }),
      }),
      deleteFeedback: builder.mutation({
        query: (id: string) => ({
          url: `${FeedbackEndpoint.delete}/${id}`,
          method: 'delete',
          headers: '',
        }),
        async onQueryStarted(config, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled

            render(
              <MessagingServices
                message="Feedback deleted Successfully"
                show={true}
                type={'success'}
              />,
            )
          } catch (error) {
            render(
              <MessagingServices
                message="something wrong feedback not deleted"
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
  useListFeedbackQuery,
  useDetailFeedbackQuery,
  useDeleteFeedbackMutation,
} = FeedbackApiService
