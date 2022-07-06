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
        />
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import treeTool from '../components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
export default {
  name: 'OrganizationalStructure',
  components: {
    treeTool
  },
  props: {},
  data () {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      defaultProps: {
        label: 'name'
      },
      departs: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getDepartments()
  },
  mounted () { },
  methods: {
    async getDepartments () {
      const { depts } = await getDepartments()
      this.departs = depts
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
