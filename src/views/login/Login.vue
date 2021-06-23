<template>
  <div class="wrapper">
    <img
      class="wrapper__img"
      src="http://www.dell-lee.com/imgs/vue3/user.png"
    />
    <div class="wrapper__input">
      <input class="wrapper__input__content" type="text" placeholder="请输入手机号" />
    </div>
    <div class="wrapper__input">
      <input class="wrapper__input__content" type="text" placeholder="请输入密码"/>
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__login-link">立即注册</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup () {
    const router = useRouter()
    const handleLogin = () => {
      localStorage.isLogin = true
      router.push({ name: 'Home' })
    }
    return {
      handleLogin
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    margin: 0 auto;
    margin-bottom: 0.4rem;
  }
  &__input {
    height: 0.48rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    &__content {
      border: none;
      outline: none;
      width: 100%;
      line-height: 0.48rem;
      background: none;
      font-size: 0.16rem;
      color: $content-notice-fontcolor;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__login-button {
    height: 0.48rem;
    line-height: .48rem;
    font-size: .16rem;
    color: #fff;
    text-align: center;
    background: #0091ff;
    box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
    border-radius: 4px;
    margin: .32rem 0.4rem 0.16rem 0.4rem;
  }
  &__login-link {
    color: $content-notice-fontcolor;
    font-size: .14rem;
    text-align: center;
  }
}
</style>
