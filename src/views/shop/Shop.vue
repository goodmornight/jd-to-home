<template>
  <div class="wrapper">
    <div class="search">
      <div class="iconfont search__back" @click="handleBackClick">&#xe600;</div>
      <div class="search__content">
        <span class="iconfont search__content__icon">&#xe613;</span>
        <input class="search__content__input" placeholder="请输入商品名称搜索"/>
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true"/>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import ShopInfo from '../../components/ShopInfo'
export default {
  name: 'Shop',
  components: { ShopInfo },
  setup () {
    const router = useRouter()
    const item = {
      _id: '1',
      name: '沃尔玛',
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      sales: 10000,
      expressLimit: 0,
      expressPrice: 5,
      slogan: 'VIP尊享满89元减4元运费券'
    }
    const handleBackClick = () => {
      router.back()
    }
    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 .18rem;
}
.search {
  display: flex;
  padding: .16rem 0 .04rem 0;
  line-height: .32rem;
  &__back {
    width: .3rem;
    font-size: .2rem;
    color: #B6B6B6;
  }
  &__content {
    display: flex;
    flex: 1;
    background: #F5F5F5;
    border-radius: .16rem;
    &__icon {
      width: .44rem;
      text-align: center;
      color: #B7B7B7;
    }
    &__input {
      display: inline-block;
      border: none;
      outline: none;
      background: none;
      width: 100%;
      height: .32rem;
      font-size: .14rem;
      color: #333333;
      &::placeholder {
        color: #333333;
      }
    }
  }
}
</style>
