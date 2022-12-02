import type { Currency } from '~currencies/api'

import type { CurrencyRateListItem } from '../../ViewModel'

export interface CurrencyRateItemProps {
  item: CurrencyRateListItem
  fetchCurrencyName: (currency: Currency) => string
}
