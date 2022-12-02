import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Dimensions, FlatList, ListRenderItem, SafeAreaView, StyleSheet, View } from 'react-native'

import { Loader } from '~shared'

import { CurrencyItem, ITEM_HEIGHT } from './components'
import { type CurrenciesListItem, useViewModel, type CurrenciesViewModel } from './ViewModel'

const CurrenciesView = observer(() => {
  const viewModel = useViewModel()

  useEffect(() => {
    viewModel.fetchCurrencies()
  }, [])

  if (viewModel.loading) {
    return <Loader />
  }

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={viewModel.keyExtractor}
        data={viewModel.currencies}
        renderItem={renderItem(viewModel)}
        onRefresh={viewModel.refresh}
        refreshing={viewModel.refreshing}
        ItemSeparatorComponent={ItemSeparatorComponent}
        maxToRenderPerBatch={ITEMS_PER_SCREEN}
        updateCellsBatchingPeriod={100}
        initialNumToRender={ITEMS_PER_SCREEN * 1.5}
        windowSize={11}
        getItemLayout={getItemLayout}
      />
    </SafeAreaView>
  )
})

const { height } = Dimensions.get('screen')
const ITEMS_PER_SCREEN = Math.ceil(height / ITEM_HEIGHT)

const renderItem =
  (viewModel: CurrenciesViewModel): ListRenderItem<CurrenciesListItem> =>
  ({ item }) =>
    <CurrencyItem item={item} onPress={viewModel.handleCurrencyPress} />

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

CurrenciesView.displayName = 'CurrenciesView'
export default CurrenciesView
