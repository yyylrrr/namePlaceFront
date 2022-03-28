<template>
  <div class="left-chart-2">
    <dv-scroll-board class="lc2-chart" :config="config" />
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>
export default {
  name: 'LeftChart2',
  data () {
    return {
      config: {
          header: ['类别', '数量/个', '检索次数/次'],
          data: [
						['总数','609923','304613'],
						['水系','12452','45245'],
						['陆地地形','8424','5788'],
						['行政区域','5453','5885'],
						['群众自治组织','75721','45687'],
						['非行政区域','7575','5746'],
						['居民点','175863','45253'],
						['交通运输设施','278','3244'],
						['水利电力通信设施','725','453'],
						['纪念地旅游胜地','778','245'],
						['建筑物','5785','254'],
						['单位','757','577']
					],
          index: true,
          // waitTime:5000,
          // carousel:'page',
          columnWidth: [48,110,95],
          align: ['center'],
          rowNum: 5,
          headerBGC: '#3399CC',
          headerHeight: 45,
          oddRowBGC: '#003B51',
          evenRowBGC: 'rgba(10, 29, 50, 0.8)'
      }
    }
  },
  created(){
  },
  methods:{
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
.left-chart-2 {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  .lc2-chart {
    height: calc(~"100% - 50px");
  }
}
</style>
