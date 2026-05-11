<template>
  <view class="page">
    <view class="header">
      <text class="greeting">你好，{{ username }} 👋</text>
      <text class="date">{{ today }}</text>
    </view>

    <view class="stats">
      <view class="stat-item">
        <text class="stat-num">{{ habits.length }}</text>
        <text class="stat-label">习惯总数</text>
      </view>
      <view class="stat-item">
        <text class="stat-num">{{ todayDoneCount }}</text>
        <text class="stat-label">今日完成</text>
      </view>
      <view class="stat-item">
        <text class="stat-num">{{ Math.round(todayDoneCount / (habits.length || 1) * 100) }}%</text>
        <text class="stat-label">完成率</text>
      </view>
    </view>

    <view class="section-title">今日习惯</view>

    <view v-if="habits.length === 0" class="empty">
      <text>还没有习惯，点击 + 添加</text>
    </view>

    <view v-for="h in habits" :key="h._id" class="habit-card" @tap="toggleCheckIn(h)">
      <view class="habit-left">
        <text class="habit-icon">{{ h.icon }}</text>
        <text class="habit-name">{{ h.name }}</text>
      </view>
      <view :class="['check-btn', isDoneToday(h) ? 'checked' : '']">
        <text>{{ isDoneToday(h) ? '✓' : '' }}</text>
      </view>
    </view>

    <view class="fab" @tap="goAdd">+</view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { api } from '../../src/utils/api.js';

const habits = ref([]);
const username = uni.getStorageSync('username') || '用户';
const today = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
const todayStr = new Date().toISOString().slice(0, 10);

const isDoneToday = (h) => h.checkIns.includes(todayStr);
const todayDoneCount = computed(() => habits.value.filter(isDoneToday).length);

const load = async () => {
  habits.value = await api.getHabits();
};

const toggleCheckIn = async (h) => {
  const updated = await api.checkIn(h._id, todayStr);
  const idx = habits.value.findIndex(x => x._id === h._id);
  habits.value[idx] = updated;
};

const goAdd = () => uni.navigateTo({ url: '/pages/add/add' });

onMounted(load);
uni.$on('refresh', load);
</script>

<style>
.page { background: #F5F5F5; min-height: 100vh; padding-bottom: 120rpx; }
.header { background: #6C63FF; padding: 40rpx 32rpx 60rpx; }
.greeting { color: #fff; font-size: 36rpx; font-weight: bold; display: block; }
.date { color: rgba(255,255,255,0.8); font-size: 26rpx; margin-top: 8rpx; display: block; }
.stats { background: #fff; margin: -30rpx 24rpx 24rpx; border-radius: 20rpx; padding: 30rpx; display: flex; justify-content: space-around; box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.08); }
.stat-item { text-align: center; }
.stat-num { font-size: 48rpx; font-weight: bold; color: #6C63FF; display: block; }
.stat-label { font-size: 24rpx; color: #999; }
.section-title { padding: 0 32rpx 16rpx; font-size: 30rpx; font-weight: bold; color: #333; }
.empty { text-align: center; padding: 80rpx; color: #999; font-size: 28rpx; }
.habit-card { background: #fff; margin: 0 24rpx 16rpx; border-radius: 16rpx; padding: 28rpx 24rpx; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05); }
.habit-left { display: flex; align-items: center; gap: 20rpx; }
.habit-icon { font-size: 44rpx; }
.habit-name { font-size: 30rpx; color: #333; }
.check-btn { width: 56rpx; height: 56rpx; border-radius: 50%; border: 3rpx solid #ddd; display: flex; align-items: center; justify-content: center; font-size: 28rpx; color: #fff; }
.checked { background: #6C63FF; border-color: #6C63FF; }
.fab { position: fixed; right: 40rpx; bottom: 60rpx; width: 100rpx; height: 100rpx; background: #6C63FF; border-radius: 50%; color: #fff; font-size: 60rpx; display: flex; align-items: center; justify-content: center; box-shadow: 0 8rpx 24rpx rgba(108,99,255,0.4); }
</style>
