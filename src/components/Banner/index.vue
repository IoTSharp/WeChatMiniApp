<template>
  <view class="banner">
    <view class="title">IoTSharp</view>
    <view class="subtitle">Open-source IoT Platform</view>
    <view class="description">设备管理、数据存储和处理<text>{{ br }}</text>以及可视化你的IoT解决方案</view>
  </view>
</template>

<script>
import './index.scss'
export default {
  name: "Banner",
  setup() {
    const br = '\n'
    return {
      br
    }
  }
}
</script>
