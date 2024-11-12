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
    path: '',
    meta: {
        title: '服务统计',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'dashboard',
        roles: [ROLES.ANYONE]
    },
    component: () => import('./index')
};
