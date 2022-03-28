<template>
  <div class="left-chart-1">
    <div class="lc1-details">地名检索前10名</div>
    <dv-capsule-chart class="lc1-chart" :config="config" />
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>



export default {
  name: 'LeftChart1',
  data () {
    return {
      config: {
        data:[
    {
      name: '地名1',
      value: 2405
    },
    {
      name: '地名2',
      value: 1968
    },
    {
      name: '地名3',
      value: 1349
    },
    {
      name: '地名4',
      value: 1210
    },
    {
      name: '地名5',
      value: 961
    },
    {
      name: '地名6',
      value: 934
    },
    {
      name: '地名7',
      value: 723
    },
    {
      name: '地名8',
      value: 424
    },
    {
      name: '地名9',
      value: 233
    },
    {
      name: '地名10',
      value: 198
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
.left-chart-1 {
  width: 100%;
  height: 35%;
  display: flex;
  flex-grow: 0;
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

  .lc1-details {
    text-align: center;
    height: 40px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    // text-indent: 20px;

    // span {
    //   color: #096dd9;
    //   font-weight: bold;
    //   font-size: 35px;
    //   margin-left: 20px;
    // }
  }

  .lc1-chart {
    flex: 1;
  }
}
</style>
