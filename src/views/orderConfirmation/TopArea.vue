<template>
  <div class="top">
    <div class="top__header">
      <div class="iconfont top__header__back" @click="handleBackClick">&#xe600;</div>
      确认订单
    </div>
    <div class="top__reciever">
      <div class="top__reciever__title">收货地址</div>
      <div class="top__reciever__address">北京理工大学国防科技园2号楼10层</div>
      <div class="top__reciever__info">
        <span class="top__reciever__info__name">瑶妹（先生）</span>
        <span class="top__reciever__info__phone">18911024266</span>
      </div>
      <div class="iconfont top__reciever__icon">&#xe600;</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return handleBackClick
}
export default {
  name: 'TopArea',
  setup () {
    const handleBackClick = useBackRouterEffect()
    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.top {
  position: relative;
  height: 1.96rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, $btn-bgColor 50%);
  &__header {
    position: relative;
    padding-top: 0.18rem;
    color: $bgColor;
    font-size: 0.16rem;
    text-align: center;
    line-height: 0.22rem;
    &__back {
      position: absolute;
      left: 0.18rem;
      font-size: 0.22rem;
    }
  }
  &__reciever {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    background: $bgColor;
    border-radius: 4px;
    &__title {
      font-size: 0.16rem;
      line-height: 0.22rem;
      color: $content-fontcolor;
      padding: 0.16rem;
      padding-bottom: 0.14rem;
    }
    &__address {
      line-height: 0.2rem;
      padding: 0 0.4rem 0 0.16rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
    }
    &__info {
      padding: 0.06rem 0 0 0.16rem;
      &__name,
      &__phone {
        margin-right: 0.06rem;
        line-height: 0.18rem;
        font-size: 0.12rem;
        color: $medium-fontColor;
      }
    }
    &__icon {
      position: absolute;
      right: 0.16rem;
      top: 0.5rem;
      color: $medium-fontColor;
      font-size: 0.2rem;
      transform: rotate(180deg);
    }
  }
}
</style>
