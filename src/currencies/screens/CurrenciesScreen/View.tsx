import { observer } from 'mobx-react-lite'
import React, { memo, useCallback, useEffect } from 'react'
import { FlatList, ListRenderItem, Pressable, SafeAreaView, StyleSheet, Text, View as RNView } from 'react-native'

import type { Currency } from '~currencies/api'

import { type CurrenciesListItem, useViewModel } from './ViewModel'

const View = observer(() => {
  const viewModel = useViewModel()

  const renderItem: ListRenderItem<CurrenciesListItem> = ({ item }) => (
    <CurrencyItem item={item} onPress={viewModel.handleCurrencyPress} />
  )

  useEffect(() => {
    viewModel.fetchCurrencies()
  }, [])

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={viewModel.keyExtractor}
        data={viewModel.currencies}
        renderItem={renderItem}
        onRefresh={viewModel.refresh}
        refreshing={viewModel.refreshing}
        ItemSeparatorComponent={() => <RNView style={styles.spacer} />}
      />
    </SafeAreaView>
  )
})

View.displayName = 'CurrenciesScreen'
export default View

interface CurrencyItemProps {
  item: CurrenciesListItem
  onPress: (id: Currency, name: string) => void
}

const CurrencyItem = memo<CurrencyItemProps>(({ onPress, item: { id, name } }) => {
  const handlePress = useCallback(() => onPress(id, name), [id, onPress, name])

  return (
    <Pressable onPress={handlePress} style={styles.item}>
      <Text>{name}</Text>
      <Text>{id.toUpperCase()}</Text>
    </Pressable>
  )
})

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  spacer: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: 'gray',
    marginLeft: 8,
  },
})
