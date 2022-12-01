import { ContainerModule } from 'inversify'

import { currenciesApiClient, type CurrenciesApiClient } from './api'
import { CurrenciesApi } from './api/Client'
import { currenciesDataSource, type CurrenciesDataSource } from './data'
import { CurrencyDataSource } from './data/DataSource'
import {
  CurrenciesViewModelImpl,
  type CurrenciesViewModel,
  currenciesViewModel,
  CurrencyRateViewModel,
  currencyRateViewModel,
  CurrencyRateViewModelImpl,
} from './screens'

const currenciesModule = new ContainerModule((bind) => {
  bind<CurrenciesApiClient>(currenciesApiClient).to(CurrenciesApi).inRequestScope()
  bind<CurrenciesDataSource>(currenciesDataSource).to(CurrencyDataSource).inSingletonScope()
  bind<CurrenciesViewModel>(currenciesViewModel).to(CurrenciesViewModelImpl).inRequestScope()
  bind<CurrencyRateViewModel>(currencyRateViewModel).to(CurrencyRateViewModelImpl).inRequestScope()
})

export { currenciesModule }
export { CurrenciesScreen, CurrencyRateScreen } from './screens'
