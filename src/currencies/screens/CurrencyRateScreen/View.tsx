import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { observer } from 'mobx-react-lite'
import React, { memo, useEffect } from 'react'
import { FlatList, ListRenderItem, StyleSheet, Text, View as RNView } from 'react-native'

import type { Currency } from '~currencies/api'
import type { MainStackParamList, Screens } from '~navigation'

import { type CurrencyRateListItem, useViewModel } from './ViewModel'

export interface ViewProps {
  currency: Currency
  title: string
  fetchCurrencyName: (currency: Currency) => string
}

export const View = observer<NativeStackScreenProps<MainStackParamList, Screens.CurrencyRate>>(
  ({
    route: {
      params: { currency, fetchCurrencyName },
    },
  }) => {
    const viewModel = useViewModel(currency)

    const renderItem: ListRenderItem<CurrencyRateListItem> = ({ item }) => (
      <CurrencyRateItem item={item} fetchCurrencyName={fetchCurrencyName} />
    )

    useEffect(() => {
      viewModel.fetchRates()
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
  }
)

View.displayName = 'CurrencyRateScreen'

interface CurrencyRateItemProps {
  item: CurrencyRateListItem
  fetchCurrencyName: (currency: Currency) => string
}

const CurrencyRateItem = memo<CurrencyRateItemProps>(({ item: { id, rate }, fetchCurrencyName }) => (
  <RNView style={styles.item}>
    <Text>
      {'->'} {fetchCurrencyName(id)} ({id.toUpperCase()})
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
