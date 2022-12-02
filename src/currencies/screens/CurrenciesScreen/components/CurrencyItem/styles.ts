import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  name: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
  },

  currency: {
    fontSize: 14,
    lineHeight: 16,
  },
})

export const ITEM_HEIGHT = styles.item.paddingVertical * 2 + styles.name.lineHeight
