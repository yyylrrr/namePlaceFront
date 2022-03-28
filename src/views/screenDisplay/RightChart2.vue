<template>
	<div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '440px'
    },
    height: {
      type: String,
      default: '260px'
    }
  },
  data() {
    return {
      chart: null,
    }
  },
  //updated mounted
  created(){
  },
  mounted() {
    this.initChart();
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },

  watch: {

  },
	
	methods: {
    setOptions() {
      var option =  {
				title: {
					text: '地名更新状况',
					left: 'center',
					textStyle:{
						color: "white"
					}
				},
				color: ["#4992ff"],
				polar: {
					radius: [10, '70%'],
					center: ['50%', '55%']
					},
				angleAxis: {
					max: 6.5,
					startAngle: 90,
				},
				radiusAxis: {
					type: 'category',
					data: ['累计更新', '县级上报', '市级审批', '省级审批'],
					show: false
				},
				tooltip: {},
				series: {
					type: 'bar',
					data: [6.5, 5.3, 4.2, 4.1],
					coordinateSystem: 'polar',
				}
      }
      this.chart.setOption(option);
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions();
    }
  }
}
</script>

<style lang="less">
html, body {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}
</style>

