import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Dimensions, FlatList, ListRenderItem, StyleSheet, View } from 'react-native'

import type { Currency } from '~currencies/api'
import { Loader } from '~shared'

import { CurrencyRateItem, ITEM_HEIGHT } from './components'
import { type CurrencyRateListItem, useViewModel } from './ViewModel'

export interface ViewProps {
  currency: Currency
  fetchCurrencyName: (currency: Currency) => string
}

const CurrencyRateView = observer<ViewProps>(({ currency, fetchCurrencyName }) => {
  const viewModel = useViewModel(currency)

  useEffect(() => {
    viewModel.fetchRates()
  }, [])

  if (viewModel.loading) {
    return <Loader />
  }

  return (
    <FlatList
      keyExtractor={viewModel.keyExtractor}
      data={viewModel.rates}
      renderItem={renderItem(fetchCurrencyName)}
      refreshing={viewModel.refreshing}
      onRefresh={viewModel.refresh}
      ItemSeparatorComponent={ItemSeparatorComponent}
      maxToRenderPerBatch={ITEMS_PER_SCREEN}
      updateCellsBatchingPeriod={100}
      initialNumToRender={ITEMS_PER_SCREEN * 1.5}
      windowSize={11}
      getItemLayout={getItemLayout}
    />
  )
})

const { height } = Dimensions.get('screen')
const ITEMS_PER_SCREEN = Math.ceil(height / ITEM_HEIGHT)

const renderItem =
  (fetchCurrencyName: (currency: Currency) => string): ListRenderItem<CurrencyRateListItem> =>
  ({ item }) =>
    <CurrencyRateItem item={item} fetchCurrencyName={fetchCurrencyName} />

const getItemLayout = (_: unknown, index: number) => ({ length: ITEM_HEIGHT, offset: index * ITEM_HEIGHT, index })

const ItemSeparatorComponent = () => <View style={styles.spacer} />

const styles = StyleSheet.create({
  spacer: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: 'gray',
    marginLeft: 8,
  },
})

CurrencyRateView.displayName = 'CurrencyRateView'
export default CurrencyRateView
