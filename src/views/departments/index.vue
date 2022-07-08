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
          @delPartment="delPartmentFn"
          @addPartment="onAddPartment"
          @editPartment="onEditPartment"
        />
      </el-tree>
    </el-card>
    <add-dept
      v-model="isShowAddPartment"
      :tree-node-id="tempTreeToolId"
      @addDepts="getDepartments"
    />
    <add-dept
      ref="addDept"
      v-model="isShowEditPartment"
      :tree-node-id="tempTreeToolId"
      @addDepts="getDepartments"
    />
  </div>
</template>

<script>
import treeTool from '../components/tree-tools.vue'
import addDept from './components/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData, filterArray } from '@/utils/index'
export default {
  name: 'OrganizationalStructure',
  components: {
    treeTool,
    addDept
  },
  props: {},
  data () {
    return {
      company: {},
      defaultProps: {
        label: 'name'
      },
      departs: [],
      tempTreeToolId: '',
      isShowAddPartment: false,
      isShowEditPartment: false
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
      this.company = { name: result.companyName, manager: '负责人', id: '' }
    },
    // delete department
    delPartmentFn (id) {
      console.log('treeTool')
      this.tempTreeToolId = id
      filterArray(this.departs, this.tempTreeToolId)
      this.tempTreeToolId = ''
    },
    // add department
    onAddPartment (id) {
      this.tempTreeToolId = id
      this.isShowAddPartment = true
    },
    // edit department
    onEditPartment (id) {
      // is is stored in atemporary variable
      this.tempTreeToolId = id
      // display pop-up layer
      this.isShowEditPartment = true
      // call child component methods directly
      this.$refs.addDept.getDepartDetail(id)
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
