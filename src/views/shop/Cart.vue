<template>
  <div class="cart">
    <div class="check">
      <div class="check__icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="check__icon__img" />
        <div class="check__icon__tag">1</div>
      </div>
      <div class="check__info">
        总计：
        <span class="check__info__price">&yen;127</span>
      </div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart'
}
</script>

<style lang="scss" scoped>
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
  box-shadow: 0 -0.01rem 0.01rem 0 #f1f1f1;
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
      right: 0.2rem;
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 50%;
      font-size: 0.12rem;
      color: #fff;
      line-height: 0.2rem;
      text-align: center;
      background: #e93b3b;
      transform: scale(0.5);
    }
  }
  &__info {
    flex: 1;
    font-size: 0.12rem;
    color: #333333;
    &__price {
      font-size: 0.18rem;
      color: #e93b3b;
    }
  }
  &__btn {
    width: 0.98rem;
    color: #fff;
    font-size: 0.14rem;
    text-align: center;
    background: #4fb0f9;
  }
}
</style>
