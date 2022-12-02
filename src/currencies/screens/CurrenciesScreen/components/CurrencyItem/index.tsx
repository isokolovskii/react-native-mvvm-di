import React, { memo, useCallback } from 'react'
import { Pressable, Text } from 'react-native'

import { styles, ITEM_HEIGHT } from './styles'
import type { CurrencyItemProps } from './types'

export const CurrencyItem = memo<CurrencyItemProps>(({ onPress, item: { id, name } }) => {
  const handlePress = useCallback(() => onPress(id, name), [id, onPress, name])

  return (
    <Pressable onPress={handlePress} style={styles.item}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.currency}>{id.toUpperCase()}</Text>
    </Pressable>
  )
})

export { ITEM_HEIGHT }
