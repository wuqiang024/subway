/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const connectionRouter = {
  path: '/connection',
  component: Layout,
  redirect: '/connection/connection-analysis',
  name: 'Connection',
  meta: {
    title: '公交接驳',
    icon: 'tree-table'
  },
  children: [
    {
      path: 'connection-analysis',
      component: () => import('@/views/connection/connection-analysis'),
      name: '接驳分析',
      meta: { title: '接驳分析' }
    },
    {
      path: 'connection-line',
      component: () => import('@/views/connection/connection-line'),
      name: '接驳线路',
      meta: { title: '接驳线路' }
    },
    {
      path: 'connection-programme',
      component: () => import('@/views/connection/connection-programme'),
      name: '接驳方案',
      meta: { title: '接驳方案' }
    }
  ]
}
export default connectionRouter
