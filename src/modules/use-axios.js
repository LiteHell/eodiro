/* use-axios.js
 * A simple asynchronous hook for Axios.
 * (c) 2019 Jang Haemin
 * @license MIT
 */

import Axios from 'axios'
import Auth from '~/modules/auth'

/**
 * @param {import('axios').AxiosRequestConfig} config
 * @param {Object} eodiroAxiosConfig
 * @param {true=} eodiroAxiosConfig.requireAuth
 * @param {Http=} eodiroAxiosConfig.http
 * @returns {Promise<[any, import('axios').AxiosResponse]>}
 */
export default function useAxios(config, eodiroAxiosConfig) {
  return new Promise((resolve) => {
    if (eodiroAxiosConfig && typeof eodiroAxiosConfig !== 'object') {
      console.error('useAxios - Wrong type of parameter eodiroAxiosConfig')
      resolve([true, null])
      return
    }

    if (eodiroAxiosConfig) {
      const { requireAuth: withHeader, http } = eodiroAxiosConfig

      if (withHeader) {
        const accessToken = Auth.getAccessToken(http)

        // If there is no access token avilable,
        // terminate api request
        if (!accessToken) {
          console.error(
            'useAxios - Set withHeader true but there is no available access token in the device'
          )

          resolve([true, null])
          return
        } else {
          // Append headers data
          config.headers = {
            accesstoken: accessToken
          }
        }
      }
    }

    Axios(config)
      .then((res) => {
        resolve([null, res])
      })
      .catch((err) => {
        if (err) {
          console.error(err)
        }

        // Network error
        // Perhaps our server is closed
        if (!err.response) {
          console.error('Network Error')

          // Client side alert
          if (typeof window !== 'undefined') {
            window.alert('Network Error')
          }
        }
        resolve([err, null])
      })
  })
}
