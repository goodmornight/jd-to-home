<template>
<div v-if="showCart && calculations.total > 0" class="mask" @click="handleCartShowChange"></div>
  <div class="cart">
    <div v-if="showCart && calculations.total > 0" class="product">
      <div class="product__header">
        <div class="product__header__all" @click="() => setCartItemsChecked(shopId)">
          <span
            class="product__header__icon iconfont"
            v-html="calculations.allChecked ? '&#xe652;' : '&#xe667;'"
          ></span>
          全选
        </div>
        <div class="product__header__clear">
          <span class="product__header__clear__btn" @click="() => cleanCartProducts(shopId)">清空购物车</span>
        </div>
      </div>
      <template
        v-for="item in productList"
        :key="item._id">
        <div v-if="item.count > 0" class="product__item">
          <div
            class="product__item__checked iconfont"
            v-html="item.check ? '&#xe652;' : '&#xe667;'"
            @click="() => changeCartItemChecked(shopId, item._id)"
          />
          <img
            class="product__item__img"
            :src="item.imgUrl"
          />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{item.name}}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{item.price}}
              <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
            </p>
          </div>
          <div class="product__number">
            <span class="product__number__minus" @click="()=>{changeCartItemInfo(shopId, item._id, item, -1)}">-</span>
            {{item.count || 0}}
            <span class="product__number__plus" @click="()=>{changeCartItemInfo(shopId, item._id, item, 1)}">+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="check__icon__img"
        @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{calculations.total}}</div>
      </div>
      <div class="check__info">
        总计：
        <span class="check__info__price">&yen; {{calculations.price}}</span>
      </div>
      <div class="check__btn">
        <router-link :to="{path: `/orderConfirmation/${shopId}`}">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from './commonCartEffect'

// 获取购物车信息逻辑
const useCartEffect = () => {
  const store = useStore()
  const route = useRoute()

  const shopId = route.params.id

  const { cartList, changeCartItemInfo } = useCommonCartEffect(shopId)

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

  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || []
    return productList
  })

  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', {
      shopId
    })
  }

  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', {
      shopId
    })
  }

  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', {
      shopId, productId
    })
  }

  return { shopId, productList, calculations, setCartItemsChecked, cleanCartProducts, changeCartItemChecked, changeCartItemInfo }
}

const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}

export default {
  name: 'Cart',
  setup () {
    const { shopId, productList, calculations, setCartItemsChecked, cleanCartProducts, changeCartItemChecked, changeCartItemInfo } = useCartEffect()
    const { showCart, handleCartShowChange } = toggleCartEffect()
    return { showCart, shopId, productList, calculations, setCartItemsChecked, cleanCartProducts, changeCartItemInfo, changeCartItemChecked, handleCartShowChange }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import "../../style/mixins.scss";

.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0,0.50);
  z-index: 1;
}
.cart {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background: $bgColor;
  z-index: 2;
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
    a {
      color: $bgColor;
      text-decoration: none;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  background: $bgColor;
  &__header {
    display: flex;
    height: .52rem;
    line-height: .52rem;
    border-bottom: 1px #f1f1f1 solid;
    &__icon {
      color: $btn-bgColor;
      font-size: .2rem;
    }
    &__all {
      width: .6rem;
      font-size: .14rem;
      margin-left: .18rem;
    }
    &__clear {
      flex: 1;
      text-align: right;
      font-size: .14rem;
      color: $content-fontcolor;
      margin-right: .18rem;
      &__btn {
        display: inline-block;
        a {
          color: $bgColor;
          text-decoration: none;
        }
      }
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &__checked {
      font-size: .2rem;
      line-height: .49rem;
      margin-right: .16rem;
      color: $btn-bgColor;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__sales {
      margin: 0.06rem 0;
      font-size: 0.12rem;
      color: $content-fontcolor;
    }
    &__price {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;
      &__minus,
      &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.16rem;
        border-radius: 50%;
        font-size: 0.2rem;
        text-align: center;
      }
      &__minus {
        border: 0.01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: 0.05rem;
      }
      &__plus {
        background: $btn-bgColor;
        color: $bgColor;
        margin-left: 0.05rem;
      }
    }
  }
}
</style>
