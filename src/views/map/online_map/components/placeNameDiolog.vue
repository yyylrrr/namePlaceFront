<template>
  <el-dialog
    :title="title"
    :data="detailinfo"
    :visible.sync="dialogVisible"
    width="80%"
		center
  >
	<div>
  <el-tabs  v-model="activeName">
    <el-tab-pane label="基本信息" name="basic-info">
	<el-row :gutter="2">
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">标准名称</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.name}}</div>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">地名代码</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.code}}</div>
		</div>
	</el-col>
	  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">别名</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.别名}}</div>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">简称</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.简称}}</div>
		</div>
	</el-col>
	</el-row>
	<el-row :gutter="2">
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">曾用名</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.曾用名}}</div>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">汉字书写</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.汉字书写}}</div>
		</div>
	</el-col>
	  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">少数名族语书写</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.少数名族语书写}}</div>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">地名原读音</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.地名原读音}}</div>
		</div>
	</el-col>
	</el-row>
	<el-row :gutter="2">
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">汉语普通话读音</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.汉语普通话读音}}</div>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">罗马字母拼写</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.罗马字母拼写}}</div>
		</div>
	</el-col>
	  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">地名语种</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.地名语种}}</div>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">地名类别</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.地名类别}}</div>
		</div>
	</el-col>
	</el-row>
	<el-row :gutter="2">
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">东经</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.longitude}}</div>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">至东经</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.至东经}}</div>
		</div>
	</el-col>
	  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">北纬</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.latitude}}</div>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">至北纬</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.至北纬}}</div>
		</div>
	</el-col>
	</el-row>
	<el-row :gutter="2">
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">地名普查状态</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.地名普查状态}}</div>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">原图名称</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.原图名称}}</div>
		</div>
	</el-col>
	  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">图号（年版）</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.图号年版}}</div>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">比例尺</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.比例尺}}</div>
		</div>
	</el-col>
	</el-row>
	<el-row :gutter="2">
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">登记人</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.登记人}}</div>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">登记单位</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.登记单位}}</div>
		</div>
	</el-col>
	  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">登记时间</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.登记时间}}</div>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">坐标系</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.坐标系}}</div>
		</div>
	</el-col>
	</el-row>
	<el-row :gutter="2">
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">设立年份</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.设立年份}}</div>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">废止年份</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.废止年份}}</div>
		</div>
	</el-col>
	  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">使用时间</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.使用时间}}</div>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">测量方法</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.测量方法}}</div>
		</div>
	</el-col>
	</el-row>
	<el-row :gutter="2">
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">地理实体概况</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<el-tooltip class="item" effect="dark" :content= detailinfo.地理实体概况 placement="top">
			<div class="proUnit">{{detailinfo.地理实体概况}}</div>
			</el-tooltip>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">地名的来历</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<el-tooltip class="item" effect="dark" :content= detailinfo.地名的来历 placement="top">
			<div class="proUnit">{{detailinfo.地名的来历}}</div>
			</el-tooltip>
		</div>
	</el-col>
	  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">地名的含义</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<el-tooltip class="item" effect="dark" :content= detailinfo.地名的含义 placement="top">
			<div class="proUnit">{{detailinfo.地名的含义}}</div>
			</el-tooltip>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">地名的历史沿革</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<el-tooltip class="item" effect="dark" :content= detailinfo.地名的历史沿革 placement="top">
			<div class="proUnit">{{detailinfo.地名的历史沿革}}</div>
			</el-tooltip>
		</div>
	</el-col>
	</el-row>
	<el-row :gutter="2">
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">通名罗马字母拼写</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.通名罗马字母拼写}}</div>
		</div>
	</el-col>
  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">资料来源</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.资料来源}}</div>
		</div>
	</el-col>
	  <el-col :span="2">
		<div class="grid-content bg-purple">
			<dt class="titleUnit">备注</dt>
		</div>
	</el-col>
  <el-col :span="4">
		<div class="grid-content bg-purple">
			<div class="proUnit">{{detailinfo.备注}}</div>
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
	</el-tabs>
	</div>
  </el-dialog>
</template>

<script>

export default {
  name: '',
  props: {
    opened1: {
      type: Boolean,
      default: false
    },
    detailinfo:{
       type: Object,
       default:function() {
        return []
      }
    }
  },
  data() {
    return {
      title: '地名信息详情',
      dialogVisible: false,
			activeName:'basic-info',
			fit:'contain',
			url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  watch: {
    opened1() {
      this.dialogVisible = true
			// console.log(this.detailinfo)
    }
  },
  methods:{
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
		border-bottom-style:dotted;
		border-width:1px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 20px;
  }
	.proUnit {
		margin-left: 5px;
		top: -5px;
		color: black;
		width: 95%;   /*一定要设置宽度，或者元素内含的百分比*/
		overflow:hidden; /*溢出的部分隐藏*/
		white-space: nowrap; /*文本不换行*/
		text-overflow:ellipsis;/*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
	}
	.gallery{
	height: 350px;
}
</style>