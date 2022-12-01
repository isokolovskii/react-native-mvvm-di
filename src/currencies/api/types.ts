export type Currency = string

export enum CurrenciesEndpoints {
  Currencies = 'currencies',
}

export interface CurrencyList {
  [currency: Currency]: string
}

export interface CurrencyExchangeRate {
  [currency: Currency]: number
}

export interface CurrencyRate {
  [currency: Currency]: CurrencyExchangeRate
}

export interface CurrencyRateDate {
  date: string
}

export interface CurrenciesApiClient {
  get: <R>(endpoint: CurrenciesEndpoints, path?: string, date?: string) => Promise<R>
}
