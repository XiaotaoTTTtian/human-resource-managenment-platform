// export salarys routing rules
import Layout from '@/layout'
export default {
  path: '/salarys',
  name: 'salarys',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/salarys'),
    name: 'salarys',
    meta: {
      title: '工资',
      icon: 'money'
    }
  }]
}
