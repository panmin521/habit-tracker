<template>
  <view class="container">
    <view class="logo">
      <text class="logo-icon">✅</text>
      <text class="logo-text">习惯打卡</text>
    </view>

    <view class="form">
      <input v-model="form.username" placeholder="用户名" class="input" />
      <input v-model="form.password" placeholder="密码" password class="input" />

      <button class="btn-primary" @tap="submit">{{ isLogin ? '登录' : '注册' }}</button>
      <text class="switch" @tap="isLogin = !isLogin">
        {{ isLogin ? '没有账号？去注册' : '已有账号？去登录' }}
      </text>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { api } from '../../src/utils/api.js';

const isLogin = ref(true);
const form = reactive({ username: '', password: '' });

const submit = async () => {
  if (!form.username || !form.password) return uni.showToast({ title: '请填写完整', icon: 'none' });
  try {
    const res = await (isLogin.value ? api.login(form) : api.register(form));
    uni.setStorageSync('token', res.token);
    uni.setStorageSync('username', res.username);
    uni.reLaunch({ url: '/pages/index/index' });
  } catch (e) {
    uni.showToast({ title: e.msg || '操作失败', icon: 'none' });
  }
};
</script>

<style>
.container { min-height: 100vh; background: #6C63FF; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40rpx; }
.logo { text-align: center; margin-bottom: 80rpx; }
.logo-icon { font-size: 100rpx; display: block; }
.logo-text { font-size: 48rpx; color: #fff; font-weight: bold; }
.form { background: #fff; border-radius: 24rpx; padding: 60rpx 40rpx; width: 100%; box-sizing: border-box; }
.input { border: 2rpx solid #eee; border-radius: 12rpx; padding: 24rpx; margin-bottom: 24rpx; font-size: 28rpx; width: 100%; box-sizing: border-box; }
.btn-primary { background: #6C63FF; color: #fff; border-radius: 12rpx; padding: 28rpx; font-size: 32rpx; border: none; width: 100%; }
.switch { display: block; text-align: center; color: #6C63FF; margin-top: 30rpx; font-size: 28rpx; }
</style>
