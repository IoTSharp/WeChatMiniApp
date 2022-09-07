<template>
  <view class="list">
    <DeviceItem />
    <DeviceItem />
  </view>
</template>

<script>
import './index.scss'
import DeviceItem from './deviceItem'
export default {
  name: "index.vue",
  components: {
    DeviceItem
  }
}
</script>

<style scoped>

</style>
