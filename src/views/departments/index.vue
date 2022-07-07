<template>
  <div class="organizational-structure">
    <el-card class="tree-card">
      <!-- 用了一个行列布局 -->
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
        style="height: 40px"
      >
        <tree-tool
          :tree-node="company"
          :is-root="true"
        />
      </el-row>
      <el-tree
        :data="departs"
        :props="defaultProps"
      >
        <tree-tool
          slot-scope="{ data }"
          :tree-node="data"
          @treeToolId="treeToolIdFn"
        />
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import treeTool from '../components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData, filterArray } from '@/utils/index'
export default {
  name: 'OrganizationalStructure',
  components: {
    treeTool
  },
  props: {},
  data () {
    return {
      company: {},
      defaultProps: {
        label: 'name'
      },
      departs: [],
      tempTreeToolId: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    // obtain organizational architecture data
    this.getDepartments()
  },
  mounted () { },
  methods: {
    async getDepartments () {
      const result = await getDepartments()
      // save data
      // tranListToTreeData converts the array data into a tree structure
      this.departs = tranListToTreeData(result.depts, '')
      this.company = { name: result.companyName, manager: '负责人' }
    },
    treeToolIdFn (id) {
      console.log('treeTool')
      this.tempTreeToolId = id
      filterArray(this.departs, this.tempTreeToolId)
      this.tempTreeToolId = ''
    }

  }
}
</script>

<style scoped >
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
