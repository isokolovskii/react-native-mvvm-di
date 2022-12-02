import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  currency: {
    fontSize: 16,
    lineHeight: 20,
  },

  value: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '500',
  },
})

export const ITEM_HEIGHT = styles.item.paddingVertical * 2 + styles.currency.lineHeight
