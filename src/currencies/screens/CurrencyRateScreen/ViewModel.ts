import { inject, injectable } from 'inversify'
import { action, makeObservable, observable, runInAction } from 'mobx'

import type { Currency } from '~currencies/api'
import { currenciesDataSource, CurrenciesDataSource } from '~currencies/data'

export interface CurrencyRateListItem {
  id: Currency
  rate: number
}

type CurrencyRates = CurrencyRateListItem[]

export interface CurrencyRateViewModel {
  rates: CurrencyRates
  date: string
  loading: boolean
  error: boolean
  refreshing: boolean
  fetchRates: () => Promise<void>
  keyExtractor: (currencyRateItem: CurrencyRateListItem) => string
  refresh: () => Promise<void>
  setCurrency: (currency: Currency) => void
}

@injectable()
export class ViewModel implements CurrencyRateViewModel {
  private dataSource: CurrenciesDataSource
  private currency: Currency | null = null

  @observable rates: CurrencyRates = []
  @observable date: string = ''
  @observable loading = false
  @observable error = false
  @observable refreshing = false

  @action
  setCurrency = (currency: string) => {
    this.currency = currency
    this.fetchRates()
  }

  fetchRates = async () => {
    if (this.currency === null) {
      runInAction(() => {
        this.error = true
        this.loading = false
      })

      return
    }

    runInAction(() => {
      if (this.rates.length === 0) {
        this.loading = true
      }
      this.error = false
    })

    try {
      const { date, ...currencyRates } = await this.dataSource.currencyRates(this.currency)
      if (!currencyRates[this.currency]) {
        runInAction(() => {
          this.error = true
          this.loading = false
        })

        return
      }

      runInAction(() => {
        this.date = date
        this.rates = Object.entries(currencyRates[this.currency!]).map(([id, rate]) => ({ id, rate }))
        this.loading = false
      })
    } catch {
      runInAction(() => {
        this.error = true
        this.loading = false
      })
    }
  }

  refresh = async () => {
    runInAction(() => {
      this.refreshing = true
    })
    await this.fetchRates()
    runInAction(() => {
      this.refreshing = false
    })
  }

  keyExtractor = (currencyRateItem: CurrencyRateListItem) => `item=${currencyRateItem.id}`

  constructor(@inject(currenciesDataSource) dataSource: CurrenciesDataSource) {
    this.dataSource = dataSource

    makeObservable(this)
  }
}

export const currencyRateViewModel = Symbol.for('CurrencyRateViewModel')
