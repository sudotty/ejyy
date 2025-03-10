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
import { touch } from '../mixins/touch';
import { range } from '../common/utils';
const THRESHOLD = 0.3;
let ARRAY = [];
CwComponent({
    props: {
        disabled: Boolean,
        leftWidth: {
            type: Number,
            value: 0,
            observer(leftWidth = 0) {
                if (this.offset > 0) {
                    this.swipeMove(leftWidth);
                }
            }
        },
        rightWidth: {
            type: Number,
            value: 0,
            observer(rightWidth = 0) {
                if (this.offset < 0) {
                    this.swipeMove(-rightWidth);
                }
            }
        },
        asyncClose: Boolean,
        name: {
            type: null,
            value: ''
        }
    },
    mixins: [touch],
    data: {
        catchMove: false,
        wrapperStyle: ''
    },
    created() {
        this.offset = 0;
        ARRAY.push(this);
    },
    destroyed() {
        ARRAY = ARRAY.filter(item => item !== this);
    },
    methods: {
        open(position) {
            const { leftWidth, rightWidth } = this.data;
            const offset = position === 'left' ? leftWidth : -rightWidth;
            this.swipeMove(offset);
            this.$emit('open', {
                position,
                name: this.data.name
            });
        },
        close() {
            this.swipeMove(0);
        },
        swipeMove(offset = 0) {
            this.offset = range(offset, -this.data.rightWidth, this.data.leftWidth);
            const transform = `translate3d(${this.offset}px, 0, 0)`;
            const transition = this.dragging ? 'none' : 'transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)';
            this.setData({
                wrapperStyle: `
        -webkit-transform: ${transform};
        -webkit-transition: ${transition};
        transform: ${transform};
        transition: ${transition};
      `
            });
        },
        swipeLeaveTransition() {
            const { leftWidth, rightWidth } = this.data;
            const { offset } = this;
            if (rightWidth > 0 && -offset > rightWidth * THRESHOLD) {
                this.open('right');
            } else if (leftWidth > 0 && offset > leftWidth * THRESHOLD) {
                this.open('left');
            } else {
                this.swipeMove(0);
            }
            this.setData({ catchMove: false });
        },
        startDrag(event) {
            if (this.data.disabled) {
                return;
            }
            this.startOffset = this.offset;
            this.touchStart(event);
        },
        noop() {},
        onDrag(event) {
            if (this.data.disabled) {
                return;
            }
            this.touchMove(event);
            if (this.direction !== 'horizontal') {
                return;
            }
            this.dragging = true;
            ARRAY.filter(item => item !== this && item.offset !== 0).forEach(item => item.close());
            this.setData({ catchMove: true });
            this.swipeMove(this.startOffset + this.deltaX);
        },
        endDrag() {
            if (this.data.disabled) {
                return;
            }
            this.dragging = false;
            this.swipeLeaveTransition();
        },
        onClick(event) {
            const { key: position = 'outside' } = event.currentTarget.dataset;
            this.$emit('click', position);
            if (!this.offset) {
                return;
            }
            if (this.data.asyncClose) {
                this.$emit('close', {
                    position,
                    instance: this,
                    name: this.data.name
                });
            } else {
                this.swipeMove(0);
            }
        }
    }
});
