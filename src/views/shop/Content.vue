<template>
  <div class="content">
    <div class="category">
      <div class="category__item category__item--active">全部商品</div>
      <div class="category__item">秒杀</div>
      <div class="category__item">新鲜水果</div>
      <div class="category__item">休闲食品</div>
      <div class="category__item">时令蔬菜</div>
      <div class="category__item">肉蛋家禽</div>
    </div>
    <div class="product">
      <div class="product__item">
        <img class="product__item__img" src="http://www.dell-lee.com/imgs/vue3/near.png" />
        <div class="product__item__detail">
          <h4 class="product__item__title">番茄250g/份</h4>
          <p class="product__item__sales">月售10件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>33.6
            <span class="product__item__origin">&yen;66.6</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.content {
  display: flex;
  position: absolute;
  top: 1.5rem;
  bottom: .49rem;
  left: 0;
  right: 0;
}
.category {
  overflow-y: scroll;
  width: 0.76rem;
  height: 100%;
  background: #F5F5F5;
  &__item {
    line-height: .4rem;
    width: .76rem;
    font-size: .14rem;
    text-align: center;
    color: $content-fontcolor;
    background: #F5F5F5;
    &--active {
      background: #FFF;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &__item {
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid #F1F1F1;
    &__img {
      width: .68rem;
      height: .68rem;
      margin-right: .16rem;
    }
    &__title {
      color: $content-fontcolor;
      font-size: .14rem;
      line-height: .2rem;
      margin: 0;
    }
    &__sales {
      color: $content-fontcolor;
      font-size: .12rem;
      line-height: .16rem;
      margin: .06rem 0;
    }
    &__price {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: #E93B3B;
    }
    &__yen {
      font-size: .12rem;
    }
    &__origin {
      margin-left: .06rem;
      color: #999;
      font-size: .1rem;
      line-height: .12rem;
      text-decoration: line-through;
    }
  }
}
</style>
