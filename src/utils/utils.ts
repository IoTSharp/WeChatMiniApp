import Taro from '@tarojs/taro'

export const showToast = (title: string) => {
  Taro.showToast({
    title,
    icon: 'none',
    duration: 3000
  })
}
