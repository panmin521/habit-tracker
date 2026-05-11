<template>
  <view class="page">
    <view class="icon-picker">
      <text class="label">选择图标</text>
      <view class="icons">
        <text
          v-for="ic in icons" :key="ic"
          :class="['icon-item', form.icon === ic ? 'selected' : '']"
          @tap="form.icon = ic"
        >{{ ic }}</text>
      </view>
    </view>

    <view class="form-group">
      <text class="label">习惯名称</text>
      <input v-model="form.name" placeholder="例如：每天喝8杯水" class="input" maxlength="20" />
    </view>

    <button class="btn-primary" @tap="submit">添加习惯</button>
  </view>
</template>

<script setup>
import { reactive } from 'vue';
import { api } from '../../src/utils/api.js';

const icons = ['💧','🏃','📚','🧘','💪','🥗','😴','✍️','🎵','🌿'];
const form = reactive({ name: '', icon: '💧' });

const submit = async () => {
  if (!form.name.trim()) return uni.showToast({ title: '请输入习惯名称', icon: 'none' });
  await api.addHabit(form);
  uni.$emit('refresh');
  uni.navigateBack();
};
</script>

<style>
.page { padding: 32rpx; background: #F5F5F5; min-height: 100vh; }
.label { font-size: 28rpx; color: #666; display: block; margin-bottom: 16rpx; }
.icon-picker { background: #fff; border-radius: 16rpx; padding: 28rpx; margin-bottom: 24rpx; }
.icons { display: flex; flex-wrap: wrap; gap: 16rpx; margin-top: 16rpx; }
.icon-item { font-size: 44rpx; width: 80rpx; height: 80rpx; display: flex; align-items: center; justify-content: center; border-radius: 16rpx; border: 3rpx solid transparent; }
.selected { border-color: #6C63FF; background: #F0EEFF; }
.form-group { background: #fff; border-radius: 16rpx; padding: 28rpx; margin-bottom: 40rpx; }
.input { border: 2rpx solid #eee; border-radius: 12rpx; padding: 24rpx; font-size: 28rpx; width: 100%; box-sizing: border-box; margin-top: 8rpx; }
.btn-primary { background: #6C63FF; color: #fff; border-radius: 16rpx; padding: 32rpx; font-size: 32rpx; border: none; width: 100%; }
</style>
