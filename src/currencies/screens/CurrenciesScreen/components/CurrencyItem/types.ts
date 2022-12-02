import type { Currency } from '~currencies/api'

import type { CurrenciesListItem } from '../../ViewModel'

export interface CurrencyItemProps {
  item: CurrenciesListItem
  onPress: (id: Currency, name: string) => void
}
