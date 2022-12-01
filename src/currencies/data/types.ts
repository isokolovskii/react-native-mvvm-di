import type { CurrencyList, Currency, CurrencyRate, CurrencyRateDate, CurrencyExchangeRate } from '~currencies/api'

export interface CurrenciesDataSource {
  list: (date?: Date) => Promise<CurrencyList>
  currencyRates: (currency: Currency, date?: Date) => Promise<CurrencyRate & CurrencyRateDate>
  exchangeRate: (from: Currency, to: Currency, date?: Date) => Promise<CurrencyExchangeRate & CurrencyRateDate>
}
