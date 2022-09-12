<template>
  <view class="index">
    <Banner />
    <view class="devices">
      <view class="device-item">
        <view class="device">
          <view class="title">设备总数</view>
          <view class="value">{{ device.deviceCount }}</view>
        </view>
      </view>
      <view class="device-item">
        <view class="device">
          <view class="title">在线设备</view>
          <view class="value">{{ device.onlineDeviceCount }}</view>
        </view>
      </view>
    </view>
    <view class="events">
      <view class="header">
        <text class="title">最新事件</text>
        <text class="more">查看更多</text>
      </view>
      <view class="list">
        <view class="event" v-for="event in events" :key="event.eventId">
          <view class="date">{{ event.createrDateTime }}</view>
          <view class="title">{{ event.eventName }}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Banner from './components/Banner/index'
import { onMounted, ref } from 'vue'
import request from '../../utils/request'
import './index.scss'
interface IDevice {
  deviceCount?: number;
  deviceCountData?: number;
  eventCount?: number;
  onlineDeviceCount?: number;
  telemetryDataCount?: number;
}
interface IEvents {
  bizData: any;
  bizid: string;
  createrDateTime: string;
  creator: string;
  customer: string;
  eventDesc: string;
  eventId: string;
  eventName: string;
  eventStaus: number;
  flowRule: string;
  mataData: string;
  tenant: string;
  type: string;
}
const device = ref<IDevice>({})
const getKanbanData = async () => {
  device.value = await request<IDevice>({
    url: '/api/home/kanban'
  })
}

const events = ref<IEvents[]>([])
const getEventsData = async () => {
  let data = await request<IEvents[]>({
    url: '/api/home/toptenevents'
  })
  events.value = data.slice(0, 5)
}

onMounted(() => {
  getKanbanData()
  getEventsData()
})

</script>
