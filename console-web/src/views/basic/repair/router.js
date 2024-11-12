/**
 * +----------------------------------------------------------------------
 * | 「e家宜业」
 * +----------------------------------------------------------------------
 * | Copyright (c) 2020-2024 https://www.chowa.cn All rights reserved.
 * +----------------------------------------------------------------------
 * | Licensed 未经授权禁止移除「e家宜业」和「卓佤科技」相关版权
 * +----------------------------------------------------------------------
 * | Author: contact@chowa.cn
 * +----------------------------------------------------------------------
 */

const ROLES = require('@/constants/role');

module.exports = {
    path: 'repair',
    meta: {
        title: '维修维护',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'maintain',
        roles: [ROLES.WXWF]
    },
    component: () => import('./index'),
    children: [
        {
            path: '',
            meta: {
                title: '全部工单',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.WXWF]
            },
            component: () => import('./list')
        },
        {
            path: 'create',
            meta: {
                title: '创建工单',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.WXWF]
            },
            component: () => import('./create')
        },
        {
            path: 'detail/:id',
            meta: {
                title: '工单详情',
                authRequired: true,
                layout: 'sider',
                nav: false,
                roles: [ROLES.WXWF]
            },
            component: () => import('./detail')
        }
    ]
};
