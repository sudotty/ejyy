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

import { getRect } from '../common/utils';
import { CwComponent } from '../common/component';
import { pageScrollMixin } from '../mixins/page-scroll';
const ROOT_ELEMENT = '.cw-sticky';
CwComponent({
    props: {
        zIndex: {
            type: Number,
            value: 99
        },
        offsetTop: {
            type: Number,
            value: 0,
            observer: 'onScroll'
        },
        disabled: {
            type: Boolean,
            observer: 'onScroll'
        },
        container: {
            type: null,
            observer: 'onScroll'
        },
        scrollTop: {
            type: null,
            observer(val) {
                this.onScroll({ scrollTop: val });
            }
        }
    },
    mixins: [
        pageScrollMixin(function(event) {
            if (this.data.scrollTop != null) {
                return;
            }
            this.onScroll(event);
        })
    ],
    data: {
        height: 0,
        fixed: false,
        transform: 0
    },
    mounted() {
        this.onScroll();
    },
    methods: {
        onScroll({ scrollTop } = {}) {
            const { container, offsetTop, disabled } = this.data;
            if (disabled) {
                this.setDataAfterDiff({
                    fixed: false,
                    transform: 0
                });
                return;
            }
            this.scrollTop = scrollTop || this.scrollTop;
            if (typeof container === 'function') {
                Promise.all([getRect(this, ROOT_ELEMENT), this.getContainerRect()]).then(([root, container]) => {
                    if (offsetTop + root.height > container.height + container.top) {
                        this.setDataAfterDiff({
                            fixed: false,
                            transform: container.height - root.height
                        });
                    } else if (offsetTop >= root.top) {
                        this.setDataAfterDiff({
                            fixed: true,
                            height: root.height,
                            transform: 0
                        });
                    } else {
                        this.setDataAfterDiff({ fixed: false, transform: 0 });
                    }
                });
                return;
            }
            getRect(this, ROOT_ELEMENT).then(root => {
                if (offsetTop >= root.top) {
                    this.setDataAfterDiff({ fixed: true, height: root.height });
                    this.transform = 0;
                } else {
                    this.setDataAfterDiff({ fixed: false });
                }
            });
        },
        setDataAfterDiff(data) {
            wx.nextTick(() => {
                const diff = Object.keys(data).reduce((prev, key) => {
                    if (data[key] !== this.data[key]) {
                        prev[key] = data[key];
                    }
                    return prev;
                }, {});
                if (Object.keys(diff).length > 0) {
                    this.setData(diff);
                }
                this.$emit('scroll', {
                    scrollTop: this.scrollTop,
                    isFixed: data.fixed || this.data.fixed
                });
            });
        },
        getContainerRect() {
            const nodesRef = this.data.container();
            return new Promise(resolve => nodesRef.boundingClientRect(resolve).exec());
        }
    }
});
