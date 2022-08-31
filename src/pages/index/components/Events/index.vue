<template>
  <view class="events">
    <view class="header">
      <text class="title">最新事件</text>
      <text class="more">查看更多</text>
    </view>
    <view class="list">
      <Event />
      <Event />
      <Event />
    </view>
  </view>
</template>

<script>
import './index.scss'
import Event from './event'
export default {
  name: "index",
  components: {
    Event
  }
}
</script>

<style scoped>

</style>
