export const axios = ({method, body, params, headers, endpoint}) => {
    return axios.request({
      method,
      url: `/${endpoint}`,
      baseURL: process.env.API_BASE_URL,
      headers,
      data: body,
      params,
    }).then(response => {
        debugger
        return response.data
    }).catch(error => {
        debugger
        return error
    })
  }
  