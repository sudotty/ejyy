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
    path: '/basic',
    meta: {
        title: '物业服务',
        authRequired: true,
        layout: 'sider',
        nav: true,
        icon: 'service',
        roles: [ROLES.ANYONE]
    },
    component: () => import('./index'),
    children: [
        require('./dashboard/router'),
        require('./epidemic/router'),
        require('./notice/router'),
        require('./pet/router'),
        require('./fitment/router'),
        require('./repair/router'),
        require('./complain/router'),
        require('./car/router'),
        require('./movecar/router'),
        require('./vistor/router'),
        require('./questionnaire/router'),
        require('./topic/router'),
        require('./building/router'),
        require('./owner/router')
    ]
};
