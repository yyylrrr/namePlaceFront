<template>
	<div>
		<div class="selectForm">
			<el-input v-model="filter" placeholder="过滤条件(楼栋)" style="width: 200px;" />
			<el-select v-model="buildingsData.buildingValue" placeholder="请选择楼栋" clearable @change="getFloorInfos" @clear="removeBuildingCondition">
				<el-option
					v-for="item in filteredBuildingsData"
					:key="item.id"
					:value="item.buildingName">
				</el-option>
			</el-select>
			<!-- <el-select v-model="buildingFloorData.FloorValue" placeholder="请选择楼层" clearable @change="getCompanyInfoByFloor" @clear="removeFloorCondition">
				<el-option
					v-for="item in filteredFloorsInfo"
					:key="item.id"
					:value="item.floorNum">
				</el-option>
			</el-select> -->
			<el-button id="search_all" class="bt-request"  type="primary" icon="el-icon-search" @click="showWholeCompanyInfo">统计全部公司信息</el-button>
		</div>
	  <!-- <h3>{{notice}}</h3> -->
		<pivot-table-panel :statistical-data="statisticsArray" :default-settings = "defaultSettingsForPivot"></pivot-table-panel>
	</div>
</template>

<script>
import { getBuildingFloors,getBuildings, GetCompanysByBuilding_ZH, GetWholeCompanys_ZH } from '@/api/company.js';
import { flatCompanyInfo } from '@/utils/tools.js'

import pivotTablePanel from '@/components/pivotTablePanel.vue'

export default {
	name: 'IqueryBuildingEco',
	components:{
		pivotTablePanel
	},
	data(){
		return {
			buildingsData: {
				buildingValue: '',
				buildings: []
			},
			buildingFloorData: {
				FloorValue: '',
				FloorInfos: []
			},
			filter:'',
			selectedValues:{
				buildingName:'',
				floor: ''
			},
			companyInfoInBuilding: null,
			companyInfoInFloor: null,
			wholeCompanyInfo: null,

			statisticsArray: [],
			defaultSettingsForPivot: {
				rows: ['楼宇名称'],
				cols: ['年份'],
				aggregatorName: '求和',
				vals: ['税收'],
				rendererName: '柱形图'
			}

			// notice: ''
		};
	},

	computed: {
		filteredBuildingsData(){
			if(this.filter){
				let filterArr = this.filter.split(/[，,]/gim);
				return this.buildingsData.buildings.filter(item => item.buildingName.indexOf(filterArr[0]) !== -1);
			}else{
				return this.buildingsData.buildings;
			}
		},
		// filteredFloorsInfo(){
		// 	if(this.filter){
		// 		let filterArr = this.filter.split(/[，,]/gim);
		// 		return this.buildingFloorData.FloorInfos.filter(item => item.floorNum.indexOf(filterArr[1])!== -1);
		// 	}else{
		// 		return this.buildingFloorData.FloorInfos;
		// 	}
			
		// }
	},

	mounted(){		
		 this.getBuildingsData();
		 this.getWholeCompanyInfo();
		// this.showWholeCompanyInfo();
		
	},

	methods: {
		getBuildingsData() {
			//请求后端楼栋数据，并统计显示
			getBuildings().then(res => {
				this.buildingsData.buildings = res;

				//初始化透视表
				// this.buildingsData.buildingValue = res[0].buildingName;
				// this.getFloorInfos(this.buildingsData.buildingValue);
      
				// this.selectedValues.buildingName = this.buildingsData.buildingValue;
				// this.notify(this.buildingsData.buildingValue);
			}).catch(err =>{
				console.log(err);
			});
		},
		getWholeCompanyInfo(){
			//请求所有公司信息, 并统计显示
			GetWholeCompanys_ZH().then(res =>{
				//debugger;
				this.wholeCompanyInfo = res;
				this.statisticsArray = this.wholeCompanyInfo; 
			}).catch(err =>{
				console.log(err);
			})
		},
		getFloorInfos (curBuildingName){
			//当前楼栋名与上一个选择的楼栋名不同时，再发送请求
			if(curBuildingName !== this.selectedValues.buildingName ){
				this.selectedValues.buildingName = curBuildingName;
				const targetBuilding = this.buildingsData.buildings.find(item => item.buildingName === curBuildingName);
				//向后端请求目标楼栋的楼层信息
				getBuildingFloors(curBuildingName).then(res =>{				
				this.buildingFloorData.FloorInfos = res;
				var hash = {};
				this.buildingFloorData.FloorInfos = this.buildingFloorData.FloorInfos.reduce(function(item, next) {
					hash[next.floorNum] ? '' : hash[next.floorNum] = true && item.push(next);
					return item
				}, [])
				console.log(this.buildingFloorData.FloorInfos);
			}).catch(err =>{
					this.$message({
					message: '请求数据失败',
					type: 'warning'
					});
			});		
				// getFloorInfoByBuilding(targetBuilding.id).then(res => {
				// 	this.buildingFloorData.FloorInfos = res[0].floor;
				// 	this.buildingFloorData.FloorValue = '';
				// }).catch(err => {
				// 	console.log(err);
				// });
				
				this.getCompanyInfoByBuilding(targetBuilding.id);	
			}else{
				this.statisticsArray = this.companyInfoInBuilding;
			}
		},
		getCompanyInfoByBuilding(buildingId){
			//请求指定楼栋中的公司信息，并统计显示
			GetCompanysByBuilding_ZH(buildingId).then(res => {
				this.companyInfoInBuilding = flatCompanyInfo(res);
				this.statisticsArray = this.companyInfoInBuilding;
			}).catch(err => {
				console.log(err);
			})
		},
		removeBuildingCondition(){
			//重置buildingFloorData对象属性
			this.buildingFloorData.FloorInfos = [];
			this.buildingFloorData.FloorValue = ''
		},
		//剔除指定楼层的条件，回退到仅指定楼栋条件，统计并显示
		removeFloorCondition(){
			this.statisticsArray = this.companyInfoInBuilding;
		},
		//查询所有公司信息
		showWholeCompanyInfo() {
			debugger
			if(this.wholeCompanyInfo){
				debugger
				this.statisticsArray = this.wholeCompanyInfo;
				this.buildingsData.buildingValue = '';
			}else{
				debugger
				this.getWholeCompanyInfo();
			}
		},
		// //显示统计对象
		// notify(value){
		//  this.notice = `当前统计:${value}`
		// }
	}
}
</script>

<style scoped>
 .selectForm{
	 margin: 5px 8px;
 }
 .bt-request{
	 display: inline-block;
 }

</style>