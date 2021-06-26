<template>
  <div class="order">
    <div class="order__price">
      实付金额 <b>¥{{ calculations.price }}</b>
    </div>
    <div class="order__btn">提交订单</div>
  </div>
  <div class="mask">
    <div class="mask__content">
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="handleConfirmOrder(true)"
        >取消订单</div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="handleConfirmOrder(false)"
        >确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { post } from '../../utils/request'
import { useCommonCartEffect } from '../../effects/cartEffects'
export default {
  name: 'Order',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const shopId = route.params.id
    const { productList, shopName, calculations } = useCommonCartEffect(shopId)
    const handleConfirmOrder = async (isCanceled) => {
      const products = []
      for (const i in productList.value) {
        const product = productList.value[i]
        products.push({ id: parseInt(product._id, 10), num: product.count })
      }
      try {
        const result = await post('/api/order', {
          addressId: 1,
          shopId,
          shopName: shopName.value,
          isCanceled,
          products
        })
        if (result?.errno === 0) {
          store.commit('cleanCartProducts', { shopId })
          router.push({ name: 'Home' })
        }
      } catch (e) {
        // 提示下单失败
      }
    }
    return { calculations, handleConfirmOrder }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  line-height: 0.49rem;
  height: 0.49rem;
  background: $bgColor;
  &__price {
    flex: 1;
    text-indent: 0.24rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
    b {
      font-size: 0.16rem;
    }
  }
  &__btn {
    width: 0.98rem;
    height: 0.49rem;
    text-align: center;
    color: $bgColor;
    font-size: 0.14rem;
    background: #4fb0f9;
  }
}
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.50);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.57rem;
    text-align: center;
    background: #FFFFFF;
    border-radius: 4px;
    &__title {
      margin: 0;
      margin-top: .24rem;
      font-size: .18rem;
      color: #333333;
    }
    &__desc {
      font-size: .14rem;
      color: #666666;
      margin-top: .08rem;
    }
    &__btns {
      display: flex;
      margin: .24rem .58rem;
    }
    &__btn {
      width: .8rem;
      height: .32rem;
      line-height: .32rem;
      border-radius: 16px;
      margin-right: .12rem;
      border: 1px solid #4FB0F9;
      &--first {
        color: #4FB0F9;
      }
      &--last {
        color: #fff;
        background: #4FB0F9;
      }
    }
  }
}
</style>
