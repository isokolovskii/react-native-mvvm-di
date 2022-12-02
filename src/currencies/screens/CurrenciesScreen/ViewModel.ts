import { makeObservable, observable, runInAction } from 'mobx'
import { useRef } from 'react'

import { core } from '~core'
import type { Currency } from '~currencies/api'
import type { CurrenciesDataSource } from '~currencies/data'
import { type StackNavigationService, Screens } from '~navigation'

import type { CurrencyRateScreenProps } from '../CurrencyRateScreen'

export interface CurrenciesListItem {
  id: Currency
  name: string
}

type CurrenciesList = CurrenciesListItem[]

export interface CurrenciesViewModel {
  currencies: CurrenciesList
  loading: boolean
  error: boolean
  refreshing: boolean
  fetchCurrencies: () => Promise<void>
  handleCurrencyPress: (currency: Currency, currencyName: string) => void
  keyExtractor: (currencyItem: CurrenciesListItem) => string
  refresh: () => Promise<void>
}

export class ViewModel implements CurrenciesViewModel {
  private dataSource: CurrenciesDataSource = core.sharedInstance.currenciesModule.dataSource
  private navigationService: StackNavigationService = core.sharedInstance.navigationModule.navigationService

  currencies: CurrenciesList = []
  loading = false
  error = false
  refreshing = false

  fetchCurrencies = async () => {
    runInAction(() => {
      if (this.currencies.length === 0) {
        this.loading = true
      }
      this.error = false
    })

    try {
      const currencies = await this.dataSource.list()
      runInAction(() => {
        this.currencies = Object.entries(currencies).map(([id, name]) => ({
          id,
          name,
        }))
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
    await this.fetchCurrencies()
    runInAction(() => {
      this.refreshing = false
    })
  }

  getCurrencyName = (currency: Currency) => this.currencies.find(({ id }) => id === currency)?.name ?? currency

  handleCurrencyPress = (currency: Currency, title: string) => {
    this.navigationService.push<CurrencyRateScreenProps>(Screens.CurrencyRate, {
      currency,
      title,
      fetchCurrencyName: this.getCurrencyName,
    })
  }

  keyExtractor = (currencyItem: CurrenciesListItem) => `item-${currencyItem.id}`

  constructor() {
    makeObservable(this, {
      currencies: observable,
      loading: observable,
      error: observable,
      refreshing: observable,
    })
  }
}

export function useViewModel() {
  const viewModel = useRef(new ViewModel())

  return viewModel.current
}
