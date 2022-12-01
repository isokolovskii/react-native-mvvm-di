import { inject, injectable } from 'inversify'

import {
  currenciesApiClient,
  CurrenciesEndpoints,
  type CurrenciesApiClient,
  type CurrencyList,
  type Currency,
  type CurrencyExchangeRate,
  type CurrencyRate,
  type CurrencyRateDate,
} from '~currencies/api'

import type { CurrenciesDataSource } from './types'

@injectable()
export class CurrencyDataSource implements CurrenciesDataSource {
  private apiClient: CurrenciesApiClient

  private formatDate = (date?: Date) => {
    if (!date) {
      return
    }

    return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`
  }

  list = (date?: Date) => this.apiClient.get<CurrencyList>(CurrenciesEndpoints.Currencies, '', this.formatDate(date))

  currencyRates = (currency: Currency, date?: Date) =>
    this.apiClient.get<CurrencyRate & CurrencyRateDate>(
      CurrenciesEndpoints.Currencies,
      `/${currency}`,
      this.formatDate(date)
    )

  exchangeRate = (from: Currency, to: Currency, date?: Date) =>
    this.apiClient.get<CurrencyExchangeRate & CurrencyRateDate>(
      CurrenciesEndpoints.Currencies,
      `/${from}/${to}`,
      this.formatDate(date)
    )

  constructor(@inject(currenciesApiClient) apiClient: CurrenciesApiClient) {
    this.apiClient = apiClient
  }
}
