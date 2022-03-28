<template>
  <div v-show="boundaryinfo.show">
    <dialog-drag
      id="dialog-1"
      class="dialog-3"
      :title="boundaryStakeDataFormTitle"
      pinned="false"
      :options="option"
      @close="close"
    >
      <el-table :data="boundaryinfo.bounstainfo" height="350" border style="width: 100%">
        <el-table-column prop="jzbh" label="界桩编号" width="80" />
				<el-table-column prop="kjsjbsm" label="空间数据标识码" width="120" />
				<el-table-column prop="gc" label="高程" width="50" />
				<el-table-column prop="zzb" label="纵坐标" width="80" />
				<el-table-column prop="hzb" label="横坐标" width="80" />
				<el-table-column prop="jd" label="经度" width="80" />
				<el-table-column prop="wd" label="纬度" width="80" />
				<el-table-column prop="jzdj" label="界桩等级" width="80" />
				<el-table-column prop="jzlx" label="界桩类型" width="80" />
				<el-table-column prop="jzcz" label="界桩材质" width="80" />
      </el-table>
    <!-- </el-scrollbar> -->
    </dialog-drag>
  </div>

</template>

<script>
import DialogDrag from 'vue-dialog-drag'

import { GetBoundaryStake } from '@/api/person.js'

export default {
  name: 'BoundaryStakeInfomationPage',
  components: {
    DialogDrag
  },
  props: {
    boundaryinfo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      option: { top: 250, left: 20, height: 450, width: 800, buttonPin: false },
    }
  },

  computed: {
		boundaryStakeDataFormTitle(){
			return '界桩信息'
		},
  },
  watch: {},
  created() {
  },
  mounted(){

  },
  methods: {
    close() {
      this.boundaryinfo.show = false;
		},
  }
}
</script>

<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

<style scoped>
</style>
