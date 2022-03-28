<template>
  <div>
    <div id="cesiumContainer" ref="cesiumContainer" />
    <!-- 界桩信息面板 -->
    <BoundaryStakeInfomationPage :boundaryinfo="boundaryStakeDataForm" />
  </div>
</template>

<script>
import axios from 'axios'
import DialogDrag from 'vue-dialog-drag'
var Cesium = require('cesium/Cesium')
import "cesium/Widgets/widgets.css";
import { interactOperate } from './interactivate3DTiles.js'
import BoundaryStakeInfomationPage from './components/boundary-stake-information-page'

export default {
  name: "boundaryStakeMap",
  components: {
    DialogDrag,
    BoundaryStakeInfomationPage
  },
  data() {
    return {
			viewer: null,
      boundaryStakeDataForm: {
        title: '界桩数据页',
        show: false,
        bounstainfo: [],
        viewer: this.viewer,
        interactOperate,
				boundaryinfo:{},
      }
		};
  },
  mounted() {
    this.initMap()
		this.loadData()
  },
  methods: {
    initMap() {
      Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjMyYjZiMC1lZmY1LTQzNmEtODg1NS01NmQzMmE2NWY2ZjMiLCJpZCI6NDQ1MSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0MDg4NTM2Mn0.7OzWWlmUmJv_EJo0RFpuiL2G_KLgZBENAAXOgU1O1qM'

      this.viewer = new Cesium.Viewer("cesiumContainer", {
        baseLayerPicker: false, // 如果设置为false，将不会创建右上角图层按钮。
        geocoder: false, // 如果设置为false，将不会创建右上角查询(放大镜)按钮。
        navigationHelpButton: false, // 如果设置为false，则不会创建右上角帮助(问号)按钮。
        homeButton: false, // 如果设置为false，将不会创建右上角主页(房子)按钮。
        sceneModePicker: false, // 如果设置为false，将不会创建右上角投影方式控件(显示二三维切换按钮)。
        animation: false, // 如果设置为false，将不会创建左下角动画小部件。
        timeline: false, // 如果设置为false，则不会创建正下方时间轴小部件。
        fullscreenButton: false, // 如果设置为false，将不会创建右下角全屏按钮。
        scene3DOnly: true, // 为 true 时，每个几何实例将仅以3D渲染以节省GPU内存。
        shouldAnimate: false, // 默认true ，否则为 false 。此选项优先于设置 Viewer＃clockViewModel 。
        // ps. Viewer＃clockViewModel 是用于控制当前时间的时钟视图模型。我们这里用不到时钟，就把shouldAnimate设为false
        infoBox: true, // 是否显示点击要素之后显示的信息
        sceneMode: 3, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
        requestRenderMode: true, // 启用请求渲染模式，不需要渲染，节约资源吧
        fullscreenElement: document.body, // 全屏时渲染的HTML元素 暂时没发现用处，虽然我关闭了全屏按钮，但是键盘按F11 浏览器也还是会进入全屏
        // 高德影像地形地图
        // imageryProvider: new Cesium.UrlTemplateImageryProvider({
        //   url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        // }),
				// 天地图影像
        // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        //   url: 'http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=b97312f85a240009c717a8480b6d54d2',
        //   layer: 'tdtBasicLayer',
        //   style: 'default',
        //   format: 'image/jpeg',
        //   tileMatrixSetID: 'GoogleMapsCompatible',
        //   show: false
        // }) 
      });
      // 高德影像注记地图
      // this.viewer.imageryLayers.addImageryProvider(
      //   new Cesium.UrlTemplateImageryProvider({
      //     url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
      //   })
      // );
      // 设置初始位置  Cesium.Cartesian3.fromDegrees(longitude, latitude, height, ellipsoid, result)
      const boundingSphere = new Cesium.BoundingSphere(
        Cesium.Cartesian3.fromDegrees(114.30, 30.25, 400),
        20000
      );
      // 定位到初始位置
      this.viewer.camera.flyToBoundingSphere(boundingSphere, {
        // 动画，定位到初始位置的过渡时间，设置成0，就没有动画
        duration: 2,
      });
		},
    loadData() {
			this.viewer.dataSources.add(
				Cesium.GeoJsonDataSource.load(
					"/geojson/boundaryStake/县级界桩.json",
				)
			);
			this.viewer.dataSources.add(
				Cesium.GeoJsonDataSource.load(
					"/geojson/boundaryStake/乡级界桩.json",
				)
			);
      // 设置3D模型mouse事件交互
      interactOperate.install(this.viewer, this.boundaryStakeDataForm)
			
			// var scene = this.viewer.scene;
      //   var handlerCli = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
      //   handlerCli.setInputAction(function (movement) {
      //       var pick = scene.pick(movement.position);
      //       if (Cesium.defined(pick)) {
      //          const Bid = pick.primitive._id.properties._标识码._value;
			// 				 console.log(Bid);
      //       }
      //   }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },

  },
};
</script>

<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

<style scoped>
/* lang="scss" */
#cesiumContainer {
  height: calc(100vh - 84px);
}
.mainMenu {
  left: 10px;
  top: 10px;
  position: absolute;
  z-index: 991;
}
</style>