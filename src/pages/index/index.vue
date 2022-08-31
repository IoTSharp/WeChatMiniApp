<template>
  <view class="index">
    <Banner />
    <Device />
    <Events />
  </view>
</template>

<script>
import './index.scss'
import Banner from './components/Banner'
import Device from './components/Device'
import Events from './components/Events'

export default {
  name: 'Index',
  components: {
    Banner,
    Events,
    Device
  }
}
</script>
