<template>
  <div>
	<div id="cesiumContainer" ref="cesiumContainer" />
	<div class ="mainBox">
    <el-row>
      <el-col :span="5" class="left">
        <el-input
          v-model="search"
          @focus="focus"
          @keyup.enter.native="searchHandler"
					class="search-input-box"
          placeholder="请输入您要搜索的地名或地名代码"
					clearable
        >
          <el-button slot="append" icon="el-icon-search" id="search" @click="searchHandler"></el-button>
        </el-input>
        <!---设置z-index优先级,防止被走马灯效果遮挡-->
        <el-card
          @mouseenter="enterSearchBoxHanlder"
          v-if="isSearch"
          id="search-box"
          style="position:relative;z-index:15"
        >
          <dl v-if="isSearchList">
            <dt class="search-title">湖北省地域搜索</dt>
						<div>
							<el-cascader
							placeholder="请选择目标区域"
							:options="options"
							:props="{ multiple: true, checkStrictly: true }"
							clearable
							class="block"
							>
							</el-cascader>
						</div>
            <el-tag
              v-for="item in hotSearchList"
              :key="item.id"
							effect="plain"
              style="margin-right:15px; margin-top:10px;"
            >{{item}}
						</el-tag>
          </dl>
          <dl v-if="isSearchList">
						<dt class="search-result">搜索结果</dt>
						<el-table
						:data="searchList"
						style="width: 100%"
						@row-click="zoomtolayer">
						<el-table-column
						align="center"
						type = "index"
						label= "序号">
						</el-table-column>
						<el-table-column
						align="center"
						prop="name"
						label="地名">
						</el-table-column>
						<el-table-column
						align="center"
						prop="code"
						label="地名代码">
						</el-table-column>
						</el-table>
          </dl>
        </el-card>
      </el-col>
    </el-row>
	</div>
	<PlaceNameDrawer :opened="placeNameForm.opened" :briefinfo = placeNameForm.placeNameBrief />
	<PlaceNameDiolog :opened1="placeNameForm.opened1" :detailinfo = placeNameForm.placeNameDetail />
  </div>
</template>

<script>
var Cesium = require('cesium/Cesium')
import DialogDrag from 'vue-dialog-drag'
import "cesium/Widgets/widgets.css"
import jumindian from "../../../assets/cesium_images/jumindian.svg"
import PlaceNameDrawer from './components/placeNameDrawer.vue'
import PlaceNameDiolog from './components/placeNameDiolog.vue'

export default {
	name: "onlineMap",
	  components: {
    DialogDrag,
		PlaceNameDrawer,
		PlaceNameDiolog 
  },
  data() {
    return {
			viewer: null,
      search: "", //当前输入框的值
      isFocus: false, //是否聚焦
      hotSearchList: ["建筑物","交通运输设施","纪念地、旅游景点","陆地水系","居民点","具有地名意义的单位"], //热门搜索数据
      searchList: [], //搜索返回数据,
			options: [{
          value: 'wuhanshi',
          label: '武汉市',
          children: [{
            value: 'jianganqu',
            label: '江岸区',
            children: [{
              value: 'dazhijiedao',
              label: '大智街道'
            }, {
              value: 'yiyuanjiedao',
              label: '一元街道'
            }, {
              value: 'chezhanjiedao',
              label: '车站街道'
            }, {
              value: 'siweijiedao',
              label: '四唯街道'
            }, {
              value: 'yongqingjiedao',
              label: '永清街道'
            }, {
              value: 'ximajiedao',
              label: '西马街道'
            }, {
              value: 'qiuchangjiedao',
              label: '球场街道'
            }, {
              value: 'laodongjiedao',
              label: '劳动街道'
            }, {
              value: 'erqijiedao',
              label: '二七街道'
            }, {
              value: 'xincunjiedao',
              label: '新村街道'
            }, {
              value: 'danshuichijiedao',
              label: '丹水池街道'
            }, {
              value: 'taibeijiedao',
              label: '台北街道'
            }, {
              value: 'huajiejiedao',
              label: '花街街道'
            }, {
              value: 'shenjiajijiedao',
              label: '谌家矶街道'
            }, {
              value: 'houhujiedao',
              label: '后湖街道'
            }, {
              value: 'tazihujiedao',
              label: '塔子湖街道'
            }]
          }, {
            value: 'jianganqu',
            label: '江汉区',
            children: [{
              value: 'minzujiedao',
              label: '民族街道'
            }, {
              value: 'hualoujiedao',
              label: '花楼街道'
            }, {
              value: 'shuitajiedao',
              label: '水塔街道'
            }, {
              value: 'minquanjiedao',
              label: '民权街道'
            }]
          }, {
            value: 'qiaokouqu',
            label: '硚口区',
            children: [{
              value: 'gutianjiedao',
              label: '古田街道'
            }]
          }, {
            value: 'hanyangqu',
            label: '汉阳区',
            children: [{
              value: 'jianqiaojiedao',
              label: '建桥街道'
            }]
          }, {
            value: 'wuchangqu',
            label: '武昌区',
            children: [{
              value: 'jiyuqiaojiedao',
              label: '积玉桥街道'
            }]
          }, {
            value: 'qingshanqu',
            label: '青山区',
            children: [{
              value: 'hongweilujiedao',
              label: '红卫路街道'
            }]
          }, {
            value: 'hongshanqu',
            label: '洪山区',
            children: [{
              value: 'luonanjiedao',
              label: '珞南街道'
            }]
          }, {
            value: 'dongxihuqu',
            label: '东西湖区',
            children: [{
              value: 'wujiashanjiedao',
              label: '吴家山街道'
            }]
          }, {
            value: 'hannanqu',
            label: '汉南区',
            children: [{
              value: 'shamaojiedao',
              label: '纱帽街道'
            }]
          }, {
            value: 'caidianqu',
            label: '蔡甸区',
            children: [{
              value: 'caidianjiedao',
              label: '蔡甸街道'
            }]
          }, {
            value: 'jiangxiaqu',
            label: '江夏区',
            children: [{
              value: 'zhifangjiedao',
              label: '纸坊街道'
            }]
          }, {
            value: 'huangpiqu',
            label: '黄陂区',
            children: [{
              value: 'qianchuanjiedao',
              label: '前川街道'
            }]
          }, {
            value: 'xinzhouqu',
            label: '新洲区',
            children: [{
              value: 'zhuchengjiedao',
              label: '邾城街道'
            }]
          }]
        }, {
          value: 'huangshishi',
          label: '黄石市',
          children: [{
            value: 'huangshigangqu',
            label: '黄石港区',
						children: [{
              value: 'shenjiayingjiedao',
              label: '沈家营街道'
            }]
          }]
        }, {
          value: 'yichangshi',
          label: '宜昌市',
          children: [{
            value: 'xilingqu',
            label: '西陵区',
						children: [{
              value: 'xilingjiedao',
              label: '西陵街道'
            }]
          }]
        }, {
          value: 'changyangtujiazuzizhixian',
          label: ' 长阳土家族自治县',
          children: [{
            value: 'longzhoupingzhen',
            label: '龙舟坪镇'
          }]
        }, {
          value: 'wufengtujiazzizhixian',
          label: '五峰土家族自治县',
          children: [{
            value: 'wufengzhen',
            label: '五峰镇'
          }]
        }, {
          value: 'xiangyangshi',
          label: '襄阳市',
          children: [{
            value: 'xiangchengqu',
            label: '襄城区'
          }]
        }, {
          value: 'ezhoushi',
          label: '鄂州市',
          children: [{
            value: 'liangzihuqu',
            label: '梁子湖区'
          }]
        }, {
          value: 'jingmenshi',
          label: '荆门市',
          children: [{
            value: 'dongbaoqu',
            label: '东宝区'
          }]
        }, {
          value: 'xiaoganshi',
          label: '孝感市',
          children: [{
            value: 'xiaonanqu',
            label: '孝南区'
          }]
        }, {
          value: 'jingzhoushi',
          label: '荆州市',
          children: [{
            value: 'shashiqu',
            label: '沙市区'
          }]
        }, {
          value: 'huanggangshi',
          label: '黄冈市',
          children: [{
            value: 'huangzhouqu',
            label: '黄州区'
          }]
        }, {
          value: 'xianningshi',
          label: '咸宁市',
          children: [{
            value: 'xiananxian',
            label: '咸安县'
          }]
        }, {
          value: 'suizhoushi',
          label: '随州市',
          children: [{
            value: 'zengduqu',
            label: '曾都区'
          }]
        }, {
          value: 'enshitujiazumiaozuzizhizhou',
          label: '恩施土家族苗族自治州',
          children: [{
            value: 'enshishi',
            label: '恩施市'
          }]
        }, {
          value: 'shengzhixiaxianjixingzhengdanwei',
          label: '省直辖县级行政单位',
          children: [{
            value: 'xiantaoshi',
            label: '仙桃市'
          }]
        }],
			pointsource: [
				{
					code:"42011500122100000001",
					name:"北二巷",
					别名:"",
					简称:"",
					曾用名:"",
					汉字书写:"北二巷",
					少数民族语书写:"",
					地名原读音:"",
					汉语普通话读音:"",
					罗马字母拼写:"Běi 2 Xiàng",
					地名语种:"",
					地名类别:"城镇居民点",
					longitude:"114.304042",
					至东经:"",
					latitude:"30.413336",
					至北纬:"",
					地名普查状态:"增加",
					原图名称:"",
					图号年版:"H-50-49-D",
					比例尺:"1:50000",
					使用时间:"现今地名",
					地名的来历:"以街巷名称命名。",
					地名的含义:"意为座落于大花岭街的北边的第二条巷子。",
					地名的历史沿革:"北二巷1985年命名，1985年隶属大桥乡大桥居委会管辖；1986-1996隶属大桥镇大桥居委会管辖；1997-2000隶属大桥街大桥居委会管辖；2001-2005隶属纸坊街大桥居委会管辖；2006至今隶属大桥新区大桥社区居委会管辖。",
					密级:"秘密",
					坐标系:"2000国家大地坐标系",
					测量方法:"图解测量",
					地理实体概况:"北二巷居民点位于大桥社区北部，西到北一巷，东至北三巷，南至大花岭街，北至大花岭小区。人口89人，邮政编码：430212。",
					多媒体信息:"北二巷11.jpg",
					资料来源:"大桥社区居民委员会、实地调查",
					备注:"",
					登记时间:"2014-09-28 00:00:00",
					登记人:"赵翠",
					登记单位:"大桥新区办事处",
					通名罗马字母拼写:"Xiàng",
					设立年份:"1985年",
					废止年份:"",
					类型:"城镇",
					长途电话区号:"",
					邮政编码:"430212",
					面积:"0",
					人口:"89",
					所在行政区:"纸坊街道",
					其他信息:"",
					联系电话:""
				},
				{
					code:"42011500122100000002",
					name:"安居乐园",
					别名:"",
					简称:"",
					曾用名:"",
					汉字书写:"安居乐园",
					少数民族语书写:"",
					地名原读音:"",
					汉语普通话读音:"",
					罗马字母拼写:"ānjū Lèyuán",
					地名语种:"",
					地名类别:"城镇居民点",
					longitude:"114.303347",
					至东经:"",
					latitude:"30.353358",
					至北纬:"",
					地名普查状态:"增加",
					原图名称:"",
					图号年版:"H-50-49-D",
					比例尺:"1:50000",
					使用时间:"现今地名",
					地名的来历:"以美好寓意命名。",
					地名的含义:"“安居乐园”寓指该小区是让人安居乐业的小区。",
					地名的历史沿革:"此地2002年前为物资局煤建公司的一个仓库，属于武昌县物资局管辖，2002年由开发商开发成三栋7层楼的商居楼，命名为安居乐园，该小区属新北路社区管辖至今。",
					密级:"秘密",
					坐标系:"2000国家大地坐标系",
					测量方法:"实地测量",
					地理实体概况:"安居乐园位于新北路社区北部，熊廷弼路201号，西至西交路，东至港湾里，南至物资里，北至熊廷弼路。该小区总面积0.02平方千米，有商居楼4栋，有居民90户、275人。邮政编码：430200。",
					多媒体信息:"安居乐园11.jpg",
					资料来源:"新北路社区居民委员会、实地调查",
					备注:"",
					登记时间:"2014-09-12 00:00:00",
					登记人:"宋华英",
					登记单位:"纸坊街道办事处",
					通名罗马字母拼写:"Lèyuán",
					设立年份:"2002年",
					废止年份:"",
					类型:"城镇",
					长途电话区号:"",
					邮政编码:"430200",
					面积:"0.02",
					人口:"275",
					所在行政区:"纸坊街道",
					其他信息:"",
					联系电话:""
				}
			],
			pointinfo:[],
			placeNameForm:{
				title:'地名数据页',
				viewer:this.viewer,
				opened1:false,
				opened:false,
				placeNameBrief:{},
				placeNameDetail:{}
			}
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjMyYjZiMC1lZmY1LTQzNmEtODg1NS01NmQzMmE2NWY2ZjMiLCJpZCI6NDQ1MSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0MDg4NTM2Mn0.7OzWWlmUmJv_EJo0RFpuiL2G_KLgZBENAAXOgU1O1qM'

      this.viewer = new Cesium.Viewer("cesiumContainer", {
        baseLayerPicker: true, // 如果设置为false，将不会创建右上角图层按钮。
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
        infoBox: false, // 是否显示点击要素之后显示的信息
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
        Cesium.Cartesian3.fromDegrees(114.304042, 30.353358, 400),
        20000
      );
      // 定位到初始位置
      this.viewer.camera.flyToBoundingSphere(boundingSphere, {
        // 动画，定位到初始位置的过渡时间，设置成0，就没有动画
        duration: 2,
      });

      // 监听地图点击事件
      const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
			// 单击事件
			handler.setInputAction((click)=>{
        // console.log(click.position);
        // 屏幕坐标转世界坐标——关键点
        const cartesian = this.viewer.camera.pickEllipsoid(click.position, this.viewer.scene.globe.ellipsoid);
        // 将笛卡尔坐标转换为地理坐标
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        // 将弧度转为度的十进制度表示，保留5位小数
        const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5);
        const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5);
        // console.log(lon, lat);

        // 获取地图上的点位实体(entity)坐标
        const pick = this.viewer.scene.pick(click.position);
        // 如果pick不是undefined，那么就是点到点位了
        if (pick && pick.id) {
          // 定位到地图中心
          this.locationToCenter(lon, lat);
        }
				if (Cesium.defined(pick)) {
					// console.log(pick.id._label._text._value);
					this.placeNameForm.opened = !this.placeNameForm.opened;
					// console.log(this.placeNameForm.opened)
					this.placeNameForm.placeNameBrief = this.pointinfo.find(item => item.name === pick.id._label._text._value)
					// console.log(this.placeNameForm.placeNameBrief)
				}
			}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		},
    focus() {
      this.isFocus = true;
    },
    enterSearchBoxHanlder() {
      clearTimeout(this.searchBoxTimeout);
    },
    searchHandler() {
			// console.log(this.search)
			// console.log(this.search.length>0)
			// console.log(this.pointsource)
			if (this.search.length>0){
				// this.searchList = this.pointsource
				// console.log(this.searchList)
				this.searchList = this.pointsource.filter((item) => {
					return item.name.match(this.search) || item.code.match(this.search)
				})
				this.viewer.entities.removeAll();
				this.pointinfo = this.searchList
				this.addMarker()
			}
    },
		zoomtolayer(row){
			// console.log(row.longitude,row.latitude)
			this.locationToCenter(row.longitude,row.latitude);
		},
		searchResult(row){
			// console.log(row.name)
			if(row.name){
					this.placeNameForm.opened1 = !this.placeNameForm.opened1;
					// console.log(this.placeNameForm.opened1)
					this.placeNameForm.placeNameDetail = row
					console.log(this.placeNameForm.placeNameDetail)
			}
		},
		addMarker(){
			var _this = this;
      // foreach循环加载点位
      this.pointinfo.forEach((pointObj) => {
				_this.addEntity(
					this.viewer,
					Cesium.Cartesian3.fromDegrees(
						//114.31988525390625, 30.577434539794922, 60),
						parseFloat(pointObj.longitude),
						parseFloat(pointObj.latitude)
					),
					pointObj.name,
					jumindian
				);
				this.viewer.scene.requestRender();
      })
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
            width: 55,
            height: 55,
            disableDepthTestDistance: 1000000000,
            scale: 0.6,
            },
        });
    },
		// 点位定位到地图中心
    locationToCenter(lon, lat) {
			this.viewer;
      const pointLocation = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(lon * 1, lat * 1, 100), 6000);
      this.viewer.camera.flyToBoundingSphere(pointLocation);
    },
  },
  computed: {
    isSearchList() {
      return this.isFocus && this.search;
    },
    isSearch() {
			if(this.search != ""){
				this.isFocus =true
				return this.isFocus;
			}
    }
  }
};
</script>

<style>
/* lang="scss" */
#cesiumContainer {
  height: calc(100vh - 84px);
}
.mainBox {
  left: 0px;
  top: 0px;
  position: absolute;
  z-index: 991;
}
.left {
  margin-top: 8px;
  margin-left: 8px;
}
.search-input-box {
  width: 400px;
}
#search {
	color: black;
  background-color: #409EFF;
  border-radius: 0%;
}
.search-title {
  color: #303133;
  font-size: 15px;
	font-weight: bold;
  margin-top: -20px;
	margin-left: 120px;
}
.block {
	width :100%;
	margin-top: 10px;
}
.historysearch-title{
  color: #303133;
  font-size: 15px;
	font-weight: bold;
  margin-top: 20px;
	margin-left: 135px;
}
.search-result{
  color: #303133;
  font-size: 15px;
	font-weight: bold;
  margin-top: 20px;
	margin-left: 135px;
}

.remove-history {
  color: #bdbaba;
  font-size: 15px;
  float: right;
  margin-top: -18px;
}
.searchResult-list{
  color: #606266;
  font-size: 15px;
	margin-left: 4px;
}
#search-box {
  width: 400px;
  height: 450px;
  margin-top: 0px;
  padding-bottom: 20px;
}
</style>