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

import { CwComponent } from '../common/component';
import { useChildren } from '../common/relation';
CwComponent({
    relation: useChildren('col', function(target) {
        const { gutter } = this.data;
        if (gutter) {
            target.setData({ gutter });
        }
    }),
    props: {
        gutter: {
            type: Number,
            observer: 'setGutter'
        }
    },
    methods: {
        setGutter() {
            this.children.forEach(col => {
                col.setData(this.data);
            });
        }
    }
});
