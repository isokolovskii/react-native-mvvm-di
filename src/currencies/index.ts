import { CurrenciesApiClientImpl } from './api'
import { CurrenciesDataSourceImpl } from './data'
import { CurrenciesModuleImpl, type CurrenciesModule } from './module'

CurrenciesModuleImpl.init({ ApiClient: CurrenciesApiClientImpl, DataSource: CurrenciesDataSourceImpl })
const currenciesModule = CurrenciesModuleImpl.sharedInstance

export { currenciesModule, type CurrenciesModule }
export {
  CurrenciesScreen,
  CurrencyRateScreen,
  type CurrencyRateScreenProps,
  currenciesScreenOptions,
  currencyRateScreenOptions,
} from './screens'
