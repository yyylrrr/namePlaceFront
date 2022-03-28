<template>
  <div class="bottom-charts">
    <div class="bc-chart-item">
			<div class="bcci-header">电子界桩状态</div>
      <dv-active-ring-chart :config="config" />
    </div>
  </div>
</template>

<script>
import LabelTag from './LabelTag'

export default {
  name: 'BottomCharts',
  components: {
    LabelTag
  },
  data () {
    return {
      config: {
        data: [
          {
            name: '正常',
            value: 602
          },
          {
            name: '倾斜',
            value: 10
          },
          {
            name: '低电量',
            value: 30
          },
          {
            name: '失联离线',
            value: 40
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        radius: '65%',
        activeRadius: '70%',
				showOriginValue: true
      },
    }
  }
}
</script>

<style lang="less">
  .bc-chart-item {
		top: 10px;
    width: 450px;
    height: 280px;
  }

  .bcci-header {
    text-align: center;
  }

  .dv-active-ring-chart {
		top: -20px;
		left: 85px;
		width: 280px;
    height: 280px;
  }

</style>