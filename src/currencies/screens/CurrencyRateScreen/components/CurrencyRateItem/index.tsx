import React, { memo } from 'react'
import { View, Text } from 'react-native'

import { styles, ITEM_HEIGHT } from './styles'
import type { CurrencyRateItemProps } from './types'

export const CurrencyRateItem = memo<CurrencyRateItemProps>(({ item: { id, rate }, fetchCurrencyName }) => (
  <View style={styles.item}>
    <Text style={styles.currency}>
      {'->'} {fetchCurrencyName(id)} ({id.toUpperCase()})
    </Text>
    <Text style={styles.value}>{rate.toFixed(2)}</Text>
  </View>
))

export { ITEM_HEIGHT }
