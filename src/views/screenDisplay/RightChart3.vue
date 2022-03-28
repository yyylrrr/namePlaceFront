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
      default: '350px'
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
     text: '地名接口调用与地名请求次数',
     left: 'center',   
     top: '10px',
     textStyle: {
        color: 'white'
     }
},
series: [{
        type: "bar",
        data: [25434, 3010, 82000, 42000],
        itemStyle: {
            //定义柱子不同颜色
            normal: {
                color: function (params) {
                    var colorList = [
                      '#67C23A', '#B5C334', '#ffa41b', '#E87C25', '#27727B',
                      '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                      '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                    ];
                    return colorList[params.dataIndex]
                },
                //显示柱子上方数据
                label: {
                  show: true,
                }
            }
        }
}],
tooltip: {
   trigger: 'axis', 
    // formatter: '{a} <br/>{b} : {c} ({d}%)'
    formatter: '{c}',  //折线图、柱状（条形）图、K线图 : {a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）
    axisPointer: {
      type: 'shadow', //line:直线指示器 || shadow:阴影指示器  || none 无指示器 || cross 十字准星指示器
    }
 },
   xAxis: {
    type: 'category',
    data: ['累计调用', '近一月调用', '累计请求', '近一月请求']
  },
  yAxis: {
    type: 'value'
  },
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

