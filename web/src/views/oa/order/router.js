/**
 * +----------------------------------------------------------------------
 * | 「e家宜业」 —— 助力物业服务升级，用心服务万千业主
 * +----------------------------------------------------------------------
 * | Copyright (c) 2020~2022 https://www.chowa.cn All rights reserved.
 * +----------------------------------------------------------------------
 * | Licensed 未经许可不能去掉「e家宜业」和「卓瓦科技」相关版权
 * +----------------------------------------------------------------------
 * | Author: jixuecong@chowa.cn
 * +----------------------------------------------------------------------
 */

const ROLES = require('@/constants/role');

module.exports = {
    path: 'order',
    meta: {
        title: '我的工单',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'order',
        roles: [ROLES.ANYONE]
    },
    component: () => import('./index'),
    redirect: '/oa/order/repair',
    children: [require('./repair/router'), require('./complain/router')]
};
