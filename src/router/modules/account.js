/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const accountRouter = {
  path: '/account',
  component: Layout,
  redirect: '/account/account-infor',
  name: 'Account',
  meta: {
    title: '账户管理',
    icon: 'peoples',
    roles: ['admin']
  },
  children: [
    {
      path: 'account-infor',
      component: () => import('@/views/account/account-infor'),
      name: '用户信息',
      meta: { title: '用户信息', roles: ['admin'] }
    }
  ]
}
export default accountRouter
