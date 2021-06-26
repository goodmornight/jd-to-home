import { computed } from 'vue'
import { useStore } from 'vuex'

// 购物车相关逻辑
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  // 添加删除购物车物品
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId, productId, productInfo, num
    })
  }
  // 店铺名
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })
  // 加入购物车列表
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || []
    return productList
  })
  // 计算总数
  const calculations = computed(() => {
    const productList = cartList?.[shopId]?.productList
    const result = {
      total: 0,
      price: 0,
      allChecked: true
    }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.check) {
          result.price += (product.count * product.price)
        }
        if (product.count > 0 && !product.check) {
          result.allChecked = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })
  return { cartList, shopName, productList, calculations, changeCartItemInfo }
}
