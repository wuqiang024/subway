/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const programmeRouter = {
  path: '/programme',
  component: Layout,
  redirect: '/programme/data-search',
  name: 'Data',
  meta: {
    title: '方案管理',
    icon: 'form'
  },
  children: [
    {
      path: 'programme-search',
      component: () => import('@/views/programme/programme-search'),
      name: '方案查询',
      meta: { title: '方案查询' }
    },
    {
      path: 'programme-evaluation',
      component: () => import('@/views/programme/programme-evaluation'),
      name: '仿真评估',
      meta: { title: '仿真评估' }
    },
    {
      path: 'programme-report',
      component: () => import('@/views/programme/programme-report'),
      name: '方案报告',
      meta: { title: '方案报告' }
    },
    {
      path: 'programme-send',
      component: () => import('@/views/programme/programme-send'),
      name: '方案发送',
      meta: { title: '方案发送' }
    }
  ]
}
export default programmeRouter
