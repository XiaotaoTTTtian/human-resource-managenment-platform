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
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] }, { name: '行政部', manager: '刘备' }, { name: '人事部', manager: '孙权' }]
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped >
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
