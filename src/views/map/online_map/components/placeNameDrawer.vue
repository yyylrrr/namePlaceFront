<template>
  <el-drawer
    :title="title"
		:data="briefinfo"
    :visible.sync="drawerVisible"
		:modal="false"
		size='330px'
  >
	<dt class="gallery-title">图片</dt>
	<div class="demo-image">
		<div class="block">
			<el-image
			 class="gallery"
      	:src="url"
				:fit="fit"
			></el-image>
			</div>
		</div>
	<dt class="name-title">地名</dt>
	<div class="name-content">
		<div>{{briefinfo.name}}</div>
	</div>
	<dt class="origin-title">地名的来历</dt>
	<div class="origin-content">
		<div>{{briefinfo.地名的来历}}</div>
	</div>
	<dt class="meaning-title">地名的含义</dt>
	<div class="meaning-content">
		<div>{{briefinfo.地名的含义}}</div>
	</div>
	<dt class="history-title">地名的历史沿革</dt>
	<div class="history-content">
		<div>{{briefinfo.地名的历史沿革}}</div>
	</div>
  </el-drawer>
</template>

<script>

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    briefinfo:{
       type: Object,
       default:function() {
        return []
      }
    }
  },
  data() {
    return {
      title: '地名信息概要',
      drawerVisible: false,
			fit:'contain',
			url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  watch: {
    opened() {
      this.drawerVisible = true
			console.log(this.briefinfo)
    }
  },
  methods:{
  }
}
</script>

<style scoped>
.block{
	height: 300px;
}
.name-title{
  color: #409EFF;
  font-size: 16px;
	font-weight: bold;
  margin-top: -20px;
	margin-left: 145px;
}
.gallery-title{
  color: #409EFF;
  font-size: 16px;
	font-weight: bold;
  margin-top: -20px;
	margin-left: 145px;
}
.origin-title{
  color: #409EFF;
  font-size: 16px;
	font-weight: bold;
  margin-top: 30px;
	margin-left: 125px;
}
.meaning-title{
  color: #409EFF;
  font-size: 16px;
	font-weight: bold;
  margin-top: 30px;
	margin-left: 125px;
}
.history-title{
  color: #409EFF;
  font-size: 16px;
	font-weight: bold;
  margin-top: 30px;
	margin-left: 110px;
}
.gallery{
	width: 290px;
	margin-left: 20px;
}
</style>