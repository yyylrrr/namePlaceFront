// 定义所选要素的交互形式
export {
  interactOperate
}

var Cesium = require('cesium/Cesium')
import { GetBoundaryStake } from '@/api/person.js'

var interactOperate = {
	viewer: null, // cesium viewer
	boundaryStakeDataForm: null,

  // 设置mouseclick 事件处理
  setMouseClick(v) {
    if (v) {
      this.orginClickHandler = this.viewer.screenSpaceEventHandler.getInputAction(
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      )
      this.viewer.screenSpaceEventHandler.setInputAction(
        this.onLeftClick.bind(this), // cesium 鼠标事件中调用该函数，因此需绑定this对象
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      )
    } else {
      // 设置为原来的
      this.viewer.screenSpaceEventHandler.setInputAction(
        this.orginClickHandler,
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      )
    }
  },

  // mouseclick事件处理
  onLeftClick(movement) {
    debugger
    // Pick a new feature
    const boundarystake = this.pickFeature(movement.position)
    // if (boundarystake === null) {
    //   this.orginClickHandler(movement.position)
    //   return
    // }

    // 显示属性面板
    const boool = boundarystake.hasOwnProperty("collection");
  
    if(boool){
			this.setInfobox(boundarystake)
	 }else{
		this.setInfobox(boundarystake)
	 }
		
  },
  // 根据屏幕坐标选取 room model
  pickFeature(position) {
    const pickedFeature = this.viewer.scene.pick(position)
    if (!Cesium.defined(pickedFeature)) {
      return null
    } else {
      return pickedFeature
    }		
  },
  // Set feature infobox description
  setInfobox(pickedFeature) {
		const Bid = pickedFeature.primitive._id.properties._标识码._value;
		console.log(Bid)
		this.getBoundaryStakeCode(Bid)
  },
  // 获取后台数据
  getBoundaryStakeCode(Bid) {
		GetBoundaryStake(Bid).then(response =>{
			if (this.boundaryStakeDataForm.show !== true) {
        this.boundaryStakeDataForm.show = true
      }
			this.boundaryStakeDataForm.bounstainfo = response
			console.log(this.boundaryStakeDataForm.bounstainfo)
		}).catch(error => {
      console.log(error)
    })
  },
  // 对cesium viewer 进行配置，响应鼠标事件，对 3dtile feature 选择、高亮显示
  install(viewer, boundaryStakeDataForm) {

    this.viewer = viewer
    this.boundaryStakeDataForm = boundaryStakeDataForm

    this.leftDown = false
    this.middleDown = false

    viewer.screenSpaceEventHandler.setInputAction(() => {
      this.leftDown = true
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)

    viewer.screenSpaceEventHandler.setInputAction(() => {
      this.leftDown = false
    }, Cesium.ScreenSpaceEventType.LEFT_UP)

    viewer.screenSpaceEventHandler.setInputAction(() => {
      this.middleDown = true
    }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN)

    viewer.screenSpaceEventHandler.setInputAction(() => {
      this.middleDown = false
    }, Cesium.ScreenSpaceEventType.MIDDLE_UP)
		
    this.setMouseClick(true)
  }
}
