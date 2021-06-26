<template>
  <div class="wrapper">
    <TopArea />
    <ProductsList />
    <Order />
  </div>
</template>

<script>
import TopArea from './TopArea'
import ProductsList from './ProductsList'
import Order from './Order'

export default {
  name: 'OrderConfirmation',
  components: { TopArea, ProductsList, Order }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #eee;
}

</style>
