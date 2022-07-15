// export the route approval rule
import Layout from '@/layout'
export default {
  path: '/approvals',
  name: 'approvals',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/approvals'),
    name: 'approvals',
    meta: {
      title: '审批',
      icon: 'tree-table'
    }
  }]
}
