/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const connectionRouter = {
  path: '/connection',
  component: Layout,
  redirect: '/connection/connection-analysis',
  name: 'Connection',
  meta: {
    title: '公交接驳',
    icon: 'tree-table',
    roles: ['admin']
  },
  children: [
    {
      path: 'connection-analysis',
      component: () => import('@/views/connection/connection-analysis'),
      name: '客流分析',
      meta: { title: '客流分析', roles: ['admin'] }
    },
    {
      path: 'connection-line',
      component: () => import('@/views/connection/connection-line'),
      name: '接驳线路',
      meta: { title: '接驳线路', roles: ['admin'] }
    },
    {
      path: 'connection-programme',
      component: () => import('@/views/connection/connection-programme'),
      name: '接驳方案',
      meta: { title: '接驳方案', roles: ['admin'] }
    }
  ]
}
export default connectionRouter
