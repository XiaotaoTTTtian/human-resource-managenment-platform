// export employee routing rules
import Layout from '@/layout'
// the outermost layout components are located in the Layout secondary route
export default {
  path: '/employess',
  name: 'employees',
  component: Layout,
  // the level-2 routing table is configured
  children: [
    {
    // defaule child routes
      path: '',
      component: () => import('@/views/employees'),
      // routing meta information -- store data onject
      meta: {
        title: '员工管理',
        icon: 'people'
      }
    },
    {
      path: 'detail/:id', // params传参 动态路由传参
      name: 'detail',
      component: () => import('@/views/employees/detail'),
      hidden: true, // 不在左侧菜单显示
      meta: {
        title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
      }

    },
    {
      path: 'print/:id',
      name: 'print',
      component: () => import('@/views/employees/print'),
      hidden: true,
      meta: {
        title: '打印',
        icon: 'people'
      }
    }
  ]
}
