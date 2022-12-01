import axios, { AxiosRequestConfig } from 'axios'
import { injectable } from 'inversify'

import { type CurrenciesApiClient, CurrenciesEndpoints } from './types'

@injectable()
export class CurrenciesApi implements CurrenciesApiClient {
  private readonly BASE_URL = `https://cdn.jsdelivr.net/gh/fawazahmed0`
  private readonly API_VERSION = 1
  private readonly ENDPOINTS: Record<CurrenciesEndpoints, string> = {
    [CurrenciesEndpoints.Currencies]: '/currencies',
  }

  private get API_URL() {
    return `${this.BASE_URL}/currency-api@${this.API_VERSION}`
  }

  private composeUrl = (endpoint: CurrenciesEndpoints, path: string, date: string) =>
    `${this.API_URL}/${date}${this.ENDPOINTS[endpoint]}${path}`

  private makeRequest = async <R>(url: string, config: AxiosRequestConfig) => {
    try {
      return (await axios<R>({ ...config, url: `${url}.min.json` })).data
    } catch {
      return (await axios<R>({ ...config, url: `${url}.json` })).data
    }
  }

  get = <Response>(endpoint: CurrenciesEndpoints, path: string = '', date: string = 'latest') =>
    this.makeRequest<Response>(this.composeUrl(endpoint, path, date), { method: 'GET' })
}
