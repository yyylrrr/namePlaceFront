<template>
  <div :id="id" :ref="id" class="my-map" :style="mapStyle" />
</template>

<script>
import * as echarts from 'echarts'
import gzData from './data/hubei.json'
export default {
  name: 'GzMap',
  components: {},
  props: {
    id: {
      type: String,
      default: 'myChart'
    },
    height: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    customOption: {
      // 自定义配置项
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      clearTime: null,
      charts: '',
      index: -1,
      option: {
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0)', // 窗口外框
          trigger: 'item'
        },
        series: [
          {
            tooltip: {
              // 显示的窗口
              trigger: 'item',
              formatter: function(item) {
                var tipHtml = ''
                tipHtml = 
								`<div style="padding: 6px 12px;
								font-size: 12px;
								color:#fff;
								border-radius:6px;
								background-color:rgba(230, 93, 110, 0.6);">
								${item.data.name}:
								<div>
								地名数： 
								<span style="color:#FEC171;
								font-size:14px;">
								${item.value}</span>
								</div>
								<div>
								地名标志数：
								<span style="color:#FEC171;
								font-size:14px;">
								${item.data.newvalue}</span>
								</div>
								<div>
								地名检索次数：
								<span style="color:#FEC171;
								font-size:14px;">
								${item.data.newnewvalue}</span>
								</div>
								</div>`
								// console.log(item)
                return tipHtml
              },
              borderWidth: 0
            },
            name: '测试',
            type: 'map',
            map: '湖北', // 自定义扩展图表类型
            zoom: 0.75, // 缩放
            roam: true, // 允许缩放，移动
            showLegendSymbol: true,
            label: {
              // 文字
              show: true,
              color: '#fff',
              fontSize: 10
            },
            itemStyle: {
              // 地图样式
              borderColor: 'rgba(147, 235, 248, 1)',
              borderWidth: 1,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(24, 146, 121, 0.8)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(24, 146, 121, 1)' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(24, 146, 121, 1)',
              shadowOffsetX: -1,
              shadowOffsetY: 3,
              shadowBlur: 10
            },
            emphasis: {
              // 鼠标移入动态的时候显示的默认样式
              itemStyle: {
                areaColor: '#E65D6E',
                borderColor: '#C03639',
                borderWidth: 1
              },
              label: {
                show: true, // 文字
                color: '#FEC171',
                fontSize: 10
              }
            },
            layoutCenter: ['50%', '50%'],
            layoutSize: '180%',
            markPoint: {
              symbol: 'none'
            },
            data: [] // 数据，可在setOption()挂载前设置即可
          }
        ]
      }
    }
  },

  computed: {
    mapStyle() {
      return {
        height: this.height,
        width: this.width
      }
    }
  },

  mounted() {},
  created() {
    echarts.registerMap('湖北', gzData)
    this.getData()
  },
  methods: {
    // 挂在
    setMyEchart() {
      const myChart = this.$refs[this.id] // 通过ref获取到DOM节点
      if (myChart) {
        const eChart = echarts.init(myChart) // 调取Echarts的初始化方法
        this.charts = eChart
        this.mapActive()
        this.mouseEvents()
        const option = { ...this.option, ...this.customOption } // 配置项合并
        eChart.setOption(option) // 配置项挂载
        window.addEventListener('resize', function() {
          eChart.resize() // 重绘
        })
      }
    },
    mouseEvents() {
      // 鼠标划入
      this.charts.on('mouseover', () => {
        // 停止定时器
        clearInterval(this.clearTime)
        this.clearTime = null
        // 清除之前的高亮
        this.charts.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.index
        })
      })
      // 鼠标划出重新开始定时器
      this.charts.on('mouseout', () => {
        this.mapActive()
      })
    },
    // 高亮轮播
    mapActive() {
      const dataLength = gzData.features.length
      // 用定时器控制高亮
      this.clearTime = setInterval(() => {
        // 清除当前地图区块的高亮
        this.charts.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.index
        })
        this.index++
        // 当前地图区块下标高亮
        this.charts.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.index
        })
        // tooltip 跟随显示
        this.charts.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: this.index
        })
        if (this.index > dataLength) {
          this.index = 0
        }
      }, 2000)
    },
    /**
     * 模拟地图数据请求
     * 这个本不应该在组件内请求，本组件只作为一个公共地图组件
     * 应当通过父组件传递，可结合watch进行处理和挂载数据
     * 具体视情况而定
     */
    getData() {
      setTimeout(() => {
        // 模拟异步请求数据
        this.option.series[0].data = gzData.features.map(item => {
          return {
            value: (Math.random() * 10000).toFixed(0), // 随机生成替代，当实际情况应当和Ajax请求数据，通过item.properties.name与实际数据匹配，从而取到实际数据value
            newvalue: (Math.random() * 10000).toFixed(0),
						newnewvalue: (Math.random() * 10000).toFixed(0),
						name: item.properties.name,
          }
        })
        this.$nextTick(() => {
          this.setMyEchart() // 页面挂载完成后执行，此时不宜在mounted生命周期执行，因为他执行时间或许小于请求时间（500ms）
        })
      }, 500) // 假设请求花了500ms
    }
  }
}
</script>
<style lang="scss" scoped>
.my-map {
  width: 100%;
  height: 100%;
}
</style>
