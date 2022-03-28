<template>
  <div class="left-chart-3">
    <div class="lc3-header">地名当月检索前10名</div>
    <dv-capsule-chart class="lc3-chart" :config="config" />
  </div>
</template>

<script>
export default {
  name: 'LeftChart3',
  data () {
    return {
      config: {
        data:[
    {
      name: '地名11',
      value: 1243
    },
    {
      name: '地名12',
      value: 1143
    },
    {
      name: '地名13',
      value: 960
    },
    {
      name: '地名14',
      value: 932
    },
    {
      name: '地名15',
      value: 911
    },
    {
      name: '地名16',
      value: 873
    },
    {
      name: '地名17',
      value: 321
    },
    {
      name: '地名18',
      value: 248
    },
    {
      name: '地名19',
      value: 123
    },
    {
      name: '地名20',
      value: 89
    }
				],
        colors: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
         unit: '次',
         showValue: true
      },
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
.left-chart-3 {
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;

  // .lc1-header {
  //   text-align: center;
  //   height: 40px;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   font-size: 20px;
  //   margin-bottom: 20px;
  // }

  .lc3-header {
    height: 20px;
     text-align: center;
    font-size: 16px;
      justify-content: center;
    align-items: center;
    margin-top: -20px;
  }

  .lc3-chart {
    flex: 1;
  }
}
</style>
