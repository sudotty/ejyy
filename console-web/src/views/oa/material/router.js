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
    path: 'material',
    meta: {
        title: '物料仓储',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'warehouse',
        roles: [ROLES.ANYONE]
    },
    component: () => import('./index.vue'),
    children: [
        {
            path: '',
            meta: {
                title: '全部物料',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.ANYONE]
            },
            component: () => import('./list.vue')
        },
        {
            path: 'purchase',
            meta: {
                title: '采购申请',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.ANYONE]
            },
            component: () => import('./purchase.vue')
        },
        {
            path: 'flow',
            meta: {
                title: '流程审批',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.ANYONE]
            },
            component: () => import('./flow.vue')
        },
        {
            path: 'purchase/:id',
            meta: {
                title: '采购详情',
                authRequired: true,
                layout: 'sider',
                nav: false,
                roles: [ROLES.ANYONE]
            },
            component: () => import('./detail.vue')
        },
        {
            path: 'category',
            meta: {
                title: '物料分类',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.WLCC]
            },
            component: () => import('./category')
        },
        {
            path: 'supplier',
            meta: {
                title: '采购名录',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.WLCC]
            },
            component: () => import('./supplier')
        },
        {
            path: 'storehouse',
            meta: {
                title: '仓库管理',
                authRequired: true,
                layout: 'sider',
                nav: true,
                roles: [ROLES.WLCC]
            },
            component: () => import('./storehouse')
        }
    ]
};
