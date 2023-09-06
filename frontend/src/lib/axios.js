import axios from 'axios'
export const axiosFetch = async ({method, body, params, headers, endpoint}) => {
    return axios.request({
      method,
      url: `/${endpoint}`,
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers,
      data: body,
      params,
    })
  }
  