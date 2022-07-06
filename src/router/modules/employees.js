// export employee routing rules
import Layout from '@/layout'
// the outermost layout components are located in the Layout secondary route
export default {
  path: '/employess',
  name: 'employees',
  component: Layout,
  // the level-2 routing table is configured
  children: [{
    // defaule child routes
    path: '',
    component: () => import('@/views/employees'),
    // routing meta information -- store data onject
    meta: {
      title: '员工管理',
      icon: 'people'
    }
  }]
}
