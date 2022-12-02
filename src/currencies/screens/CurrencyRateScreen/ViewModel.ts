import { makeObservable, observable, runInAction } from 'mobx'
import { useRef } from 'react'

import { core } from '~core'
import type { Currency } from '~currencies/api'
import type { CurrenciesDataSource } from '~currencies/data'

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
}

class ViewModel implements CurrencyRateViewModel {
  private dataSource: CurrenciesDataSource = core.currenciesModule.dataSource
  private currency: Currency

  rates: CurrencyRates = []
  date: string = ''
  loading = false
  error = false
  refreshing = false

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

  constructor(currency: Currency) {
    this.currency = currency

    makeObservable(this, {
      rates: observable,
      date: observable,
      loading: observable,
      error: observable,
      refreshing: observable,
    })
  }
}

export function useViewModel(currency: Currency) {
  const viewModel = useRef(new ViewModel(currency))

  return viewModel.current
}
