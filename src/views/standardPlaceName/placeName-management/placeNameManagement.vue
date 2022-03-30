<template>
  <div>
		<el-row :gutter="6">
			<el-col :span="16">
				<div class="search-box">
					<el-row :gutter="8">
						<el-col :span="2">
							<div class="grid-content bg-purple">
								<dt class="search-box-title">行政区划:</dt>
							</div>
							</el-col>
						<el-col :span="4">
							<div class="grid-content bg-purple">
								<el-cascader
									:options="regionoptions"
									:props="{ checkStrictly: true }"
									:show-all-levels="false"
									clearable
									size="mini"
									class="search-box-handler"
								>
								</el-cascader>
							</div>
						</el-col>
						<el-col :span="2">
							<div class="grid-content bg-purple">
								<dt class="search-box-title">地名类别:</dt>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content bg-purple">
								<el-select v-model="typevalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in typeoptions"
										:key="item.typevalue"
										:label="item.label"
										:value="item.typevalue">
									</el-option>
								</el-select>
							</div>
						</el-col>
						<el-col :span="2">
							<div class="grid-content bg-purple">
								<dt class="search-box-title">使用时间:</dt>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content bg-purple">
								<el-date-picker
									size="mini"
									v-model="datevalue"
									type="month"
									placeholder="选择月">
								</el-date-picker>
							</div>
						</el-col>
						<el-col :span="2">
							<div class="grid-content bg-purple">
								<dt class="search-box-title">可否公开:</dt>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content bg-purple">
								<el-select v-model="publicvalue" 
									clearable 
									size="mini"
									class="search-box-handler">
									<el-option
										v-for="item in publicoptions"
										:key="item.publicvalue"
										:label="item.label"
										:value="item.publicvalue">
									</el-option>
								</el-select>
							</div>
						</el-col>
					</el-row>
					<el-row :gutter="6">
						<el-col :span="2">
							<div class="grid-content bg-purple">
								<dt class="search-box-title">标准名称:</dt>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content bg-purple">
								<el-input
									v-model="search"
									clearable
									size="mini"
									class="search-box-handler"
								>
								</el-input>
							</div>
						</el-col>
						<el-col :span="2">
							<div class="grid-content bg-purple">
								<dt class="search-box-title">更新时间:</dt>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<el-date-picker
									v-model="daterange"
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
									size="mini"
									class="search-box-handler">
								</el-date-picker>
							</div>
						</el-col>
						<el-col :span="4" :offset="2">
							<div class="grid-content bg-purple">
								<el-button
								size="mini"
								type="primary"
								icon="el-icon-search"
								class="search-button"
								@click="searchHandler"
								>
								搜索
								</el-button>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="unKnow">
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="4">
			<el-col :span="8">
				<div class="select-operate">
					<el-button class="edit-button" size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
				</div>
			</el-col>
			<el-col :span="16">
				<div class="search-edit">
					<el-tabs  v-model="activeName" type="border-card">
						<el-tab-pane label="基本信息" name="basic-info">
							<el-row :gutter="10">
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">标准名称</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.name}}</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">地名代码</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.code}}</div>
								</div>
							</el-col>
								<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">别名</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.别名}}</div>
								</div>
							</el-col>
							</el-row>
							<el-row :gutter="10">
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">简称</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.简称}}</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">曾用名</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.曾用名}}</div>
								</div>
							</el-col>
								<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">汉字书写</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.汉字书写}}</div>
								</div>
							</el-col>
							</el-row>
							<el-row :gutter="10">
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">少数名族语书写</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.少数名族语书写}}</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">地名原读音</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.地名原读音}}</div>
								</div>
							</el-col>
								<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">汉语普通话读音</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.汉语普通话读音}}</div>
								</div>
							</el-col>
							</el-row>
							<el-row :gutter="10">
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">罗马字母拼写</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.罗马字母拼写}}</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">地名语种</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.地名语种}}</div>
								</div>
							</el-col>
								<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">地名类别</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.地名类别}}</div>
								</div>
							</el-col>
							</el-row>
							<el-row :gutter="10">
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">东经</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.longitude}}</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">至东经</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.至东经}}</div>
								</div>
							</el-col>
								<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">地名普查状态</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.地名普查状态}}</div>
								</div>
							</el-col>
							</el-row>
							<el-row :gutter="10">
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">北纬</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.latitude}}</div>
								</div>
							</el-col>
								<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">至北纬</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.至北纬}}</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">原图名称</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.原图名称}}</div>
								</div>
							</el-col>
							</el-row>
							<el-row :gutter="10">
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">图号（年版）</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.图号年版}}</div>
								</div>
							</el-col>
								<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">比例尺</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.比例尺}}</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">坐标系</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.坐标系}}</div>
								</div>
							</el-col>
							</el-row>
							<el-row :gutter="10">
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">登记人</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.登记人}}</div>
								</div>
							</el-col>
								<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">登记单位</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.登记单位}}</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">登记时间</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.登记时间}}</div>
								</div>
							</el-col>
							</el-row>
							<el-row :gutter="10">
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">设立年份</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.设立年份}}</div>
								</div>
							</el-col>
								<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">废止年份</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.废止年份}}</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">使用时间</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.使用时间}}</div>
								</div>
							</el-col>
							</el-row>
							<el-row :gutter="10">
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">测量方法</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.测量方法}}</div>
								</div>
							</el-col>
								<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">通名罗马字母拼写</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.通名罗马字母拼写}}</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">资料来源</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.资料来源}}</div>
								</div>
							</el-col>
							</el-row>
							<el-row :gutter="10">
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">地理实体概况</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<el-tooltip class="item" effect="dark" :content= this.detailResult.地理实体概况 placement="top">
									<div class="proUnit">{{this.detailResult.地理实体概况}}</div>
									</el-tooltip>
								</div>
							</el-col>
								<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">地名的来历</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.地名的来历}}</div>
								</div>
							</el-col>
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">备注</dt>
								</div>
							</el-col>
							<el-col :span="5" class="border">
								<div class="grid-content bg-purple">
									<div class="proUnit">{{this.detailResult.备注}}</div>
								</div>
							</el-col>
							</el-row>
							<el-row :gutter="10">
							<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">地理实体概况</dt>
								</div>
							</el-col>
							<el-col :span="9" class="border">
								<div class="grid-content bg-purple">
									<el-tooltip class="item" effect="dark" :content= this.detailResult.地名的含义 placement="top">
									<div class="proUnit">{{this.detailResult.地名的含义}}</div>
									</el-tooltip>
								</div>
							</el-col>
								<el-col :span="3">
								<div class="grid-content bg-purple">
									<dt class="titleUnit">地名的历史沿革</dt>
								</div>
							</el-col>
							<el-col :span="9" class="border">
								<div class="grid-content bg-purple">
									<el-tooltip class="item" effect="dark" :content= this.detailResult.地名的历史沿革 placement="top">
									<div class="proUnit">{{this.detailResult.地名的历史沿革}}</div>
									</el-tooltip>
								</div>
							</el-col>
							</el-row>
						</el-tab-pane>
						<el-tab-pane label="多媒体信息" name="media-info">
							<div class="demo-image">
								<div class="block">
									<el-image
										class="gallery"
										:src="url"
										:fit="fit"
									></el-image>
									</div>
								</div>
						</el-tab-pane>
						<el-tab-pane label="附加属性" name="addition-info">

						</el-tab-pane>
					</el-tabs>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="4">
			<el-col :span="4">
				<div class="search-map">
					<div id="cesiumContainer" ref="cesiumContainer" />
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="4">
			<el-col :span="4" :offset="4">
				<div class="search-list">
					<dt class="searchresult">搜索结果</dt>
						<el-table
						:data="searchList"
						border
						class="search-result-list"
						@row-click="showdetail"
						>
						<el-table-column
						align="center"
						type = "index"
						label= "序号"
						width="60">
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
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="4">
			<el-col :span="16" :offset="8">
				<div class="info-box">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span>消息中心</span>
						</div>
					</el-card>
				</div>
			</el-col>
		</el-row>
  </div>
</template>

<script>
	var Cesium = require('cesium/Cesium')
	import "cesium/Widgets/widgets.css";
	import jumindian from "../../../assets/cesium_images/jumindian.svg"
  export default {
    name: 'placeNameManagementMap',
    data() {
      return {
				fit:'contain',
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				viewer: null,
        search: "", //当前输入框的值
				datevalue:"",
				daterange:"",
				activeName:'basic-info',
				regionoptions: [{
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
							value: 'jianghanqu',
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
				typeoptions: [{
					typevalue:'类别1',
					label:'类别1'
				},{
					typevalue:'类别2',
					label:'类别2'
				},{
					typevalue:'类别3',
					label:'类别3'
				}],
				typevalue:'',
				publicoptions: [{
          publicvalue: '是',
          label: '是'
				},{
          publicvalue: '否',
          label: '否'
				},{
          publicvalue: '不限',
          label: '不限'
				}],
				publicvalue:'',
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
				searchList: [], //搜索返回数据,
				detailResult: [],
      }
    },
		mounted() {
			this.initMap();
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
					Cesium.Cartesian3.fromDegrees(114.30, 30.25, 400),
					20000
				);
				// 定位到初始位置
				this.viewer.camera.flyToBoundingSphere(boundingSphere, {
					// 动画，定位到初始位置的过渡时间，设置成0，就没有动画
					duration: 2,
				});
			},
			searchHandler() {
				// console.log(this.search)
				// console.log(this.search.length>0)
				// console.log(this.pointsource)
				if (this.search.length>0){
					// this.searchList = this.pointsource
					// console.log(this.searchList)
					this.searchList = this.pointsource.filter((item) => {
						return item.name.match(this.search)
					})
					// console.log(this.searchList)
					this.viewer.entities.removeAll();
					this.pointinfo = this.searchList
					this.addMarker()
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
			showdetail(row){
				// console.log(row.longitude,row.latitude)
				this.locationToCenter(row.longitude,row.latitude);
				this.detailResult = row
				console.log(this.detailResult)
			},
			// 点位定位到地图中心
			locationToCenter(lon, lat) {
				this.viewer;
				const pointLocation = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(lon * 1, lat * 1, 100), 6000);
				this.viewer.camera.flyToBoundingSphere(pointLocation);
			},
		},
  }
</script>

<style>
  .el-row {
    margin-bottom: 5px;
  }
  .search-box {
    /* background: #99a9bf; */
		height: 90px;
  }
  /* .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  } */
	.search-box-title {
		color: #303133;
		font-size: 15px;
		font-weight: bold;
		padding: 8px 0;
		margin-top: 5px;
		margin-left: 8px;
	}
	.search-box-handler {
		width :100%;
		margin-top: 8px;
	}
	/* 日期选择框的宽度 */
	.el-date-editor.el-input, .el-date-editor.el-input__inner {
			width: 100%;
			margin-top: 8px;
	}
	.search-button {
		margin-top: 8px;
	}
  .unKnow {
    /* background: #99a9bf; */
		height: 90px;
  }
  .select-operate {
		height: 60px;
   	/* background: #99a9bf; */
  }
	.edit-button {
		margin-left: 8px;
		margin-top: 12px;
	}
  .search-edit {
		height: 740px;
  }
	.el-tabs__content {
		height: 700px;
	}
  .search-map {
		height: 60px;
		margin-top: -680px;
		height: 800px;
   	/* background: #99a9bf; */
  }
	#cesiumContainer {
		width : 100%;
		height: calc(83vh - 86px);
		margin: 0;
		padding: 0;
		overflow: hidden;
	}
  .search-list {
		height: 60px;
		margin-top: -805px;
		height: 800px;
   	/* background: #99a9bf; */
  }
	.searchresult {
		color: #303133;
		font-size: 15px;
		font-weight: bold;
		text-align:center;
	}
	.search-result-list{
		width: 100%;
		height: 783px;
	}
	.proUnit {
		height: 50px;
		color: black;
		width: 95%;   /*一定要设置宽度，或者元素内含的百分比*/
		overflow:hidden; /*溢出的部分隐藏*/
		white-space: nowrap; /*文本不换行*/
		text-overflow:ellipsis;/*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
	}
	.border {
    border-radius: 4px;
		border-style:solid;
		border-width:1px;
		border-color:#E4E7ED;
	}
  .info-box {
		height: 120px;
		width: -200px;
		margin-top: -130px;
   	/* background: #99a9bf; */
  }
	.el-card__header {
		height: 30px;
	}
	.el-card__body {
		height: 80px;
	}
</style>