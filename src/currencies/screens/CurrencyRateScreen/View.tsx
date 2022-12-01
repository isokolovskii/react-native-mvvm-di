import { useInjection } from 'inversify-react'
import { observer } from 'mobx-react-lite'
import React, { memo, useEffect } from 'react'
import { FlatList, ListRenderItem, StyleSheet, Text, View as RNView } from 'react-native'

import { CurrencyRateListItem, currencyRateViewModel, CurrencyRateViewModel } from './ViewModel'

export const View = observer(() => {
  const viewModel = useInjection<CurrencyRateViewModel>(currencyRateViewModel)

  const renderItem: ListRenderItem<CurrencyRateListItem> = ({ item }) => <CurrencyRateItem item={item} />

  useEffect(() => {
    viewModel.setCurrency('eur')
  }, [])

  return (
    <FlatList
      keyExtractor={viewModel.keyExtractor}
      data={viewModel.rates}
      renderItem={renderItem}
      refreshing={viewModel.refreshing}
      onRefresh={viewModel.refresh}
      ItemSeparatorComponent={() => <RNView style={styles.spacer} />}
    />
  )
})

View.displayName = 'CurrencyRateScreen'

interface CurrencyRateItemProps {
  item: CurrencyRateListItem
}

const CurrencyRateItem = memo<CurrencyRateItemProps>(({ item: { id, rate } }) => (
  <RNView style={styles.item}>
    <Text>
      {'->'} {id}
    </Text>
    <Text>{rate.toFixed(2)}</Text>
  </RNView>
))

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
