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

import { CwComponent } from '../../../common/component';
CwComponent({
    props: {
        title: {
            type: String,
            value: '日期选择'
        },
        subtitle: String,
        showTitle: Boolean,
        showSubtitle: Boolean
    },
    data: {
        weekdays: ['日', '一', '二', '三', '四', '五', '六']
    },
    methods: {}
});
