<template>
  <div>
    <div id="cesiumContainer" ref="cesiumContainer" />
    <div class="mainMenu">
      <el-dropdown @command="handleMenuCommand">
        <el-button type="primary">
          基础功能
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="showLayer">图层管理</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <dialog-drag
      v-show="layerTreeVisible"
      id="dialog-1"
      class="dialog-3"
      title="图层目录"
      pinned="false"
      :options="{ top: 60, width: 280, buttonPin: false }"
      @close="closeLayerTreePanel"
    >
      <el-scrollbar :native="false" style="height: 100%">
        <el-tree
          show-checkbox
          :data="modelTreeData"
          :props="defaultProps"
          node-key="id"
          :default-expanded-keys="[1, 2]"
          :default-checked-keys="defaultChecked"
          :render-content="renderContent"
          @check-change="handleCheckChange"
          @node-click="handleNodeClick"
        />
      </el-scrollbar>
    </dialog-drag>

    <!-- 3D单体化模型颜色设置面板 -->
    <ColorSetPage :option="layerPropertyOption" @colorChange="setDthColor" />
    <!-- 人房信息面板 -->
    <PersonHouseInfomationPage :person-house-info="personHouseDataForm" />
    <!-- 渍水点详细信息面板 -->
    <RainpointDialog :opened="personHouseDataForm.opened" :rainpointinfo ="personHouseDataForm.raininfo" />
  </div>
</template>

<script>
import axios from 'axios'

import DialogDrag from 'vue-dialog-drag'

var Cesium = require('cesium/Cesium')
import {GetRainPoint } from '@/api/person.js'
import 'cesium/Widgets/widgets.css'
import { interactOperate } from './interactivate3DTiles.js'
import PersonHouseInfomationPage from './components/person-house-infomation-page'
import ColorSetPage from './components/color-set-page'
import RainpointDialog from './components/rainPointDialog.vue'
import Wetpoint from "../../../assets/cesium_images/渍水点.svg"


export default {
  name: 'PersonHouseMap',
  components: {
    DialogDrag,
    RainpointDialog,
    PersonHouseInfomationPage,
    ColorSetPage,
  },
  data() {
    return {
      viewer: null,
      sDTilesCollection: new Map(),

      layerTreeVisible: false,
      modelTreeData: [],
      rainPoint:[],

      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultChecked: [102, 202], // 模型树check状态

      // dialogVisible: false,
      currentModelId: -1, // 当前被设置的模型id

      layerPropertyOption: {
        show: false, // 图层设置面试显示开关
        color: '' // 模型颜色
      },
      // modelColor: null,
     
      personHouseDataForm: {
        title: '人房数据页',
        show: false,
        opened: false,
        roomid: '',
        personInRoom: [],
        raininfo:{},
        viewer: this.viewer,
        interactOperate
      }
    }
  },
  created(){
    this.getrainPointData()
  },
  mounted() {
    this.initMap()
    this.loadData()
  },
  methods: {
    initMap() {
      Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjMyYjZiMC1lZmY1LTQzNmEtODg1NS01NmQzMmE2NWY2ZjMiLCJpZCI6NDQ1MSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0MDg4NTM2Mn0.7OzWWlmUmJv_EJo0RFpuiL2G_KLgZBENAAXOgU1O1qM'

      this.viewer = new Cesium.Viewer('cesiumContainer', {
        shouldAnimate: true,
        baseLayerPicker: false,
        fullscreenButton: false,
        sceneModePicker: false,
        timeline: false,
        geocoder: false,
        homeButton: false,
        navigationHelpButton: false,
        animation: false,
        // infoBox: false,
        requestRenderMode: true
        // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        //   url: 'http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=b97312f85a240009c717a8480b6d54d2',
        //   layer: 'tdtBasicLayer',
        //   style: 'default',
        //   format: 'image/jpeg',
        //   tileMatrixSetID: 'GoogleMapsCompatible',
        //   show: false
        // }) // 天地图影像
        // terrainProvider: Cesium.createWorldTerrain() //建议不要加载全球地形
      })
    },
    loadData() {
      axios
        .request({
          url: '/3DModelsSetting.json', // 读取public目录下3维模型配置文件
          method: 'get'
        })
        .then((res) => {
          this.modelTreeData = res.data
          // 加载倾斜测量模型
          this.modelTreeData[0].children.forEach((element) => {
            this.load3DTiles(
              this.viewer,
              element.id,
              element.url,
              true,
              null,
              null
            )
          });

          this.modelTreeData[1].children.forEach((element) => {
            this.load3DTiles(
              this.viewer,
              element.id,
              element.url,
              true,
              Cesium.ClassificationType.CESIUM_3D_TILE,
              new Cesium.Cesium3DTileStyle({
                color: 'rgba(255,255,255,0.01)'
              })
            )
          })
        })

      // 设置3D模型mouse事件交互
      interactOperate.install(this.viewer, this.personHouseDataForm)
    },

    load3DTiles(viewer, mouldId, url, isFlyto, classificationType, style) {
      var tiltTileset = null

      if (classificationType) {
        // debugger;
        tiltTileset = new Cesium.Cesium3DTileset({
          url: url
        })
      } else {
        tiltTileset = new Cesium.Cesium3DTileset({
          url: url
        })
      }

      // tiltTileset.classificationType = classificationType;
      tiltTileset.style = style

      const self = this

      tiltTileset.readyPromise.then((tileset) => {
        viewer.scene.primitives.add(tileset)
        // 如默认tree中勾选，设置模型可见
        tileset.show = false
        this.defaultChecked.forEach((item) => {
          if (item === mouldId) {
            tileset.show = true
            if (isFlyto) viewer.flyTo(tileset)
          }
        })

        self.sDTilesCollection.set(mouldId, tiltTileset)
      })
    },
    // 处理菜单事件
    handleMenuCommand(command) {
      if (command === 'showLayer') {
        this.layerTreeVisible = true
      }
    },
    // 关闭图层面板
    closeLayerTreePanel() {
      this.layerTreeVisible = false
    },

    handleCheckChange(data, checked, indeterminate) {
      // debugger;
      var target = this.sDTilesCollection.get(data.id)
      if (Cesium.defined(target)) {
        target.show = checked
      }
    },
    handleNodeClick(data) {
      var target = this.sDTilesCollection.get(data.id)
      if (Cesium.defined(target)) {
        this.viewer.flyTo(target)
      }
    },

    // 渲染模型tree
    renderContent(h, { node, data }) {
      // debugge
      // var icon = ['type', 'layer']

      if (node.level === 1) {
        return (
          <span class='custom-tree-node'>
            <span>
              <svg-icon style='margin-right:8px' icon-class='type' />
              <span>{node.label}</span>
            </span>
          </span>
        )
      }
      return (
        <span class='custom-tree-node'>
          <span>
            <svg-icon style='margin-right:8px' icon-class='layer' />
            <span>{node.label}</span>
          </span>
          <span>
            <el-button
              v-show={node.checked}
              size='mini'
              type='text'
              on-click={(event) => {
                this.openTPanel(node, data, event)
              }}
            >
              设置
            </el-button>
          </span>
        </span>
      )
    },
    // 打开图层设置面板
    openTPanel(node, data, event) {
      event.stopPropagation()
      // console.log(node, data)
      // debugger
      var self = this
      this.currentModelId = data.id // 记录当前设置模型id
      var target = this.sDTilesCollection.get(this.currentModelId)
      if (Cesium.defined(target)) {
        self.layerPropertyOption.color = target.style.color.expression
        self.layerPropertyOption.show = true
      }
    },

    // 设置3D单体模型颜色
    setDthColor(color) {
      // debugger
      var target = this.sDTilesCollection.get(this.currentModelId)
      if (Cesium.defined(target)) {
        target.style = new Cesium.Cesium3DTileStyle({
          color: color
        })
      }
    },
    //获取后台数据，渍水点 添加entity标记
    getrainPointData(){
        var _this = this;
        GetRainPoint().then(response =>{
           response.forEach(item =>{
            debugger
                _this.addEntity(
                    this.viewer,
                    Cesium.Cartesian3.fromDegrees(
                      //114.31988525390625, 30.577434539794922, 60),
                        parseFloat(item["longitude"]),
                        parseFloat(item["latitude"]),
                        parseFloat(item["height"]) 
                     ),
                    item.name,   //item.type,'里斯'
                    Wetpoint
                );
                  console.log(item);
           })  
        }).catch(err =>{
            console.log(err);
        });
    },
    addEntity(viewer,postion, text, img) {
        viewer.entities.add({
            // id: text,
            // id:personID,
            // phone:phone,
            position: postion,
            label: {
            text: text,
            // font: parseInt(objEntity.FontSize) * 2.2 + 'px ' + objEntity.FontName,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 6,
            translucencyByDistance: new Cesium.NearFarScalar(
                1.5e2,
                1.0,
                1.5e5,
                0.0
            ),
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            // verticalOrigin : LSGlobe.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
            pixelOffset: new Cesium.Cartesian2(20, -2), // 偏移量
            disableDepthTestDistance: 1000000000, // 优先级
            scale: 0.5,
            },
            billboard: {
            image: img, // default: undefined
            text: "123",
            show: true, // default
            width: 55,
            height: 55,
            disableDepthTestDistance: 1000000000,
            scale: 0.6,
            },
        });
    },
  }
}
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
