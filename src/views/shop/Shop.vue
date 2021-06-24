<template>
  <div class="wrapper">
    <div class="search">
      <div class="iconfont search__back" @click="handleBackClick">&#xe600;</div>
      <div class="search__content">
        <span class="iconfont search__content__icon">&#xe613;</span>
        <input class="search__content__input" placeholder="请输入商品名称搜索"/>
      </div>
    </div>
    <ShopInfo v-show="item.imgUrl" :item="item" :hideBorder="true"/>
    <Content />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'
import Content from './Content'

const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return handleBackClick
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const handleBackClick = useBackRouterEffect()
    getItemData()
    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper {
  padding: 0 .18rem;
}
.search {
  display: flex;
  padding: .14rem 0 .04rem 0;
  line-height: .32rem;
  &__back {
    width: .3rem;
    font-size: .2rem;
    color: #B6B6B6;
  }
  &__content {
    display: flex;
    flex: 1;
    background: $search-bgColor;
    border-radius: .16rem;
    &__icon {
      width: .44rem;
      text-align: center;
      color: $search-fontColor;
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
