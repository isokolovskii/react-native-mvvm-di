import { ContainerModule } from 'inversify'

import { currenciesApiClient, type CurrenciesApiClient } from './api'
import { CurrenciesApi } from './api/Client'
import { currenciesDataSource, type CurrenciesDataSource } from './data'
import { CurrencyDataSource } from './data/DataSource'
import {
  ViewModel as CurrenciesViewModelImpl,
  type CurrenciesViewModel,
  currenciesViewModel,
} from './screens/CurrenciesScreen/ViewModel'

const CURRENCIES_MODULE = {
  currenciesApiClient,
  currenciesDataSource,
}

const currenciesModule = new ContainerModule((bind) => {
  bind<CurrenciesApiClient>(currenciesApiClient).to(CurrenciesApi).inRequestScope()
  bind<CurrenciesDataSource>(currenciesDataSource).to(CurrencyDataSource).inSingletonScope()
  bind<CurrenciesViewModel>(currenciesViewModel).to(CurrenciesViewModelImpl).inRequestScope()
})

export { currenciesModule, CURRENCIES_MODULE, type CurrenciesApiClient, type CurrenciesDataSource }
export { CurrenciesScreen } from './screens'
