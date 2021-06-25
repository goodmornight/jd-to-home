<template>
  <div class="cart">
    <div class="check">
      <div class="check__icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="check__icon__img" />
        <div class="check__icon__tag">{{total}}</div>
      </div>
      <div class="check__info">
        总计：
        <span class="check__info__price">&yen; {{price}}</span>
      </div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

// 获取购物车信息逻辑
const useCartEffect = () => {
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id
  const cartList = store.state.cartList

  const total = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += product.count
      }
    }
    return count
  })

  const price = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += (product.count * product.price)
      }
    }
    return count.toFixed(2)
  })
  return { total, price }
}
export default {
  name: 'Cart',
  setup () {
    const { total, price } = useCartEffect()
    return { total, price }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.cart {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}
.check {
  display: flex;
  position: relative;
  line-height: 0.49rem;
  box-shadow: 0 -0.01rem 0.01rem 0 $content-bgColor;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      display: block;
      width: 0.28rem;
      height: 0.26rem;
      margin: 0.12rem auto;
    }
    &__tag {
      position: absolute;
      top: 0.04rem;
      left: 0.46rem;
      min-width: 0.2rem;
      height: 0.2rem;
      border-radius: .1rem;
      font-size: 0.12rem;
      color: $bgColor;
      line-height: 0.2rem;
      text-align: center;
      background: $hightlight-fontColor;
      padding: 0 .04rem;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    font-size: 0.12rem;
    color: $content-fontcolor;
    &__price {
      font-size: 0.18rem;
      color: $hightlight-fontColor;
    }
  }
  &__btn {
    width: 0.98rem;
    color: $bgColor;
    font-size: 0.14rem;
    text-align: center;
    background: #4fb0f9;
  }
}
</style>
