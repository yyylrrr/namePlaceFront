<template>
    		 <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
const animationDuration = 2000


export default {
  name: 'BottomCharts',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '1380px'
    },
    height: {
      type: String,
      default: '330px'
    },
  },
  components: {
    
  },
  data () {
    return {
			seriesData1:[6443,36017,1864,17845,185],
      seriesData2:[24,1020,55,588,5],
      seriesData3:[76,2409,188,2188,18],
      seriesData4:[688,8204,420,4201,42],
			seriesData5:[5688,24384,1201,11201,120],
    }
  },
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
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },

  watch: {
    seriesData1: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
    seriesData2: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
    seriesData3: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },  
     seriesData4: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
     seriesData5: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },



  methods: {
    setOptions() {
      var option = {
          toolbox: {
              show : true,
              orient: 'vertical',
              x: 'right',
              y: 'center',
              feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                  restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
        grid: {
          
          left: 10,
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
          legend: {
						top:"5%",
              data:['总数','省级','市级','县级','乡镇'],
              textStyle:{
                 color:'auto'
              },
          },
          xAxis : [
              {
                  type : 'category',
                  data : ['界线条数（条）','界线总长度（千米）','界桩数（个）','边界点（个）','三角点（个）'],
                  axisTick: { alignWithLabel: true},
                  axisLabel:{ interval:0 }
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
					grid : {
						left:"6%",
						right:"3%",
						bottom:"8%"
					},
          series : [
							{
                  name:'总数',
                  type:'line',
                  data:this.seriesData1,
									symbol:"circle"
              },
              {
                  name:'省级',
                  type:'line',
                  data:this.seriesData2,
									symbol:"circle"
              },
              {
                  name:'市级',
                  type:'line',
                  data:this.seriesData3,
									symbol:"circle"
              },
              {
                  name:'县级',
                  type:'line',
                  data:this.seriesData4,
									symbol:"circle"
              },
              {
                  name:'乡镇',
                  type:'line',
                  data:this.seriesData5,
									symbol:"circle"
              },
          ]
      };               
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
