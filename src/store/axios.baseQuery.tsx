import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const axiosBaseQuery = (
  { baseUrl, auth }: { baseUrl: string; auth: string } = {
    baseUrl: '',
    auth: '',
  },
): BaseQueryFn<
  {
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
  },
  unknown,
  unknown
> => async ({ url, method, data }) => {
  try {
    const result = await axios({
      url: baseUrl + url,
      method,
      data,
      headers: { 'x-access-token': auth },
    })
    return { data: result.data }
  } catch (axiosError) {
    let err = axiosError as AxiosError
    return {
      error: { status: err.response?.status, data: err.response?.data },
    }
  }
}
