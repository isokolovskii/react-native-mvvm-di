import { core } from '~core'
import {
  CurrenciesEndpoints,
  type CurrenciesApiClient,
  type CurrencyList,
  type Currency,
  type CurrencyExchangeRate,
  type CurrencyRate,
  type CurrencyRateDate,
} from '~currencies/api'

import type { CurrenciesDataSource } from './types'

export class CurrenciesDataSourceImpl implements CurrenciesDataSource {
  private apiClient: CurrenciesApiClient = core.currenciesModule.apiClient

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
}
