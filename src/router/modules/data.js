/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const dataRouter = {
  path: '/data',
  component: Layout,
  redirect: '/data/data-search',
  name: 'Data',
  meta: {
    title: '数据管理',
    icon: 'tree'
  },
  children: [
    {
      path: 'data-search',
      component: () => import('@/views/data/data-search'),
      name: '数据查找',
      meta: { title: '数据查找' }
    },
    {
      path: 'data-import',
      component: () => import('@/views/data/data-import'),
      name: '数据查找',
      meta: { title: '数据导入' }
    }
  ]
}
export default dataRouter
