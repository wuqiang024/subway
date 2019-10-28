/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const accidentRouter = {
  path: '/accident',
  component: Layout,
  redirect: '/accident/accident-submit',
  name: 'Accident',
  meta: {
    title: '事故管理',
    icon: 'skill'
  },
  children: [
    {
      path: 'accident-submit',
      component: () => import('@/views/accident/accident-submit'),
      name: '事故提交',
      meta: { title: '事故提交' }
    },
    {
      path: 'accident-search',
      component: () => import('@/views/accident/accident-search'),
      name: '事故查询',
      meta: { title: '事故查询' }
    },
    {
      path: 'traffic-adjustment',
      component: () => import('@/views/accident/traffic-adjustment'),
      name: '行车调整',
      meta: { title: '行车调整' }
    }
  ]
}
export default accidentRouter
