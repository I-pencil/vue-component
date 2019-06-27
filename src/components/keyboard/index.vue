<template>
<transition name="fade">
  <div v-if="value" class="keyboard">
    <div class="key__bd primary-background flex">
      <div class="key-content__lt">
        <div class="flex key-items">
          <div class="key">
            <div class="flex-column full-height key-item" @touchend="$handleEnter(1)">
              <span>1</span>
            </div>
          </div>
          <div class="key">
            <div class="flex-column full-height key-item" @touchend="$handleEnter(2)">
              <span>2</span>
            </div>
          </div>
          <div class="key">
            <div class="flex-column full-height key-item" @touchend="$handleEnter(3)">
              <span>3</span>
            </div>
          </div>
        </div>
        <div class="flex top-border key-items">
          <div class="key">
             <div class="flex-column full-height key-item" @touchend="$handleEnter(4)">
              <span>4</span>
            </div>
          </div>
          <div class="key">
            <div class="flex-column full-height key-item" @touchend="$handleEnter(5)">
              <span>5</span>
            </div>
          </div>
          <div class="key">
            <div class="flex-column full-height key-item" @touchend="$handleEnter(6)">
              <span>6</span>
            </div>
          </div>
        </div>
        <div class="flex top-border key-items">
          <div class="key">
            <div class="flex-column full-height key-item" @touchend="$handleEnter(7)">
              <span>7</span>
            </div>
          </div>
          <div class="key">
            <div class="flex-column full-height key-item" @touchend="$handleEnter(8)">
              <span>8</span>
            </div>
          </div>
          <div class="key">
            <div class="flex-column full-height key-item" @touchend="$handleEnter(9)">
              <span>9</span>
            </div>
          </div>
        </div>
        <div class="flex top-border key-items">
          <div class="key">
            <div v-if="showPoint" class="flex-column full-height key-item" @touchend="$handleEnter('.')">
              <span>.</span>
            </div>
            <div v-else class="flex-column full-height key-item" @touchend="$handleClear">
              <span>C</span>
            </div>
          </div>
          <div class="key">
            <div class="flex-column full-height key-item" @touchend="$handleEnter(0)">
              <span>0</span>
            </div>
          </div>
          <div class="key">
            <div class="flex-column full-height key-item"  @touchend="$handleDelete">
               <i class="iconfont icon-shanchu"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="key-content__rt left-border" v-if="type === 'multiple'">
        <slot name="operation">
          <div class="flex-column full-height key-item">
            <div :class="`operate-height__${confirmHeight}`">
              <div class="flex-column full-height key-item" @touchend="$handleClose">
                <span class="key-close"><i class="iconfont icon-juxingkaobei"></i>关闭</span>
              </div>
            </div>
            <div class="top-border" :class="`comfirm-height__${confirmHeight}`">
              <div class="flex-column full-height key-item" @touchend="$handleConfirm">
                <span>{{ confirmText }}</span>
              </div>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
export default {
  name: 'BtKeyboard',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    type: { // 键盘类型：是否带有操作按钮部分
      type: String,
      default: 'multiple',
      validator: (value) => {
        return ['multiple', 'simple'].includes(value)
      }
    },
    confirmHeight: { // 键盘 OK 按钮高度
      type: String,
      default: 'half',
      validator: (value) => {
        return ['quarter', 'half', 'three-quarter', 'full'].includes(value)
      }
    },
    value: { // 是否显示键盘
      type: Boolean,
      default: true
    },
    confirmText: { // OK 按钮文案
      type: String,
      default: '确定'
    },
    showPoint: { // 是否显示小数点
      type: Boolean,
      default: true
    }
  },
  methods: {
    $handleEnter (value) {
      this.$emit('enter', value)
    },
    $handleDelete () {
      this.$emit('delete')
    },
    $handleConfirm () {
      this.$emit('confirm')
    },
    $handleClose () {
      this.$emit('change', false)
    },
    $handleClear () {
      this.$emit('clear')
    }
  }
}
</script>
<style lang="less" scoped>
@keyFontSize: 0.2rem;
@opFontSize: 0.14rem;

.keyboard {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1620;
}
.key__hd {
  padding: 0.09rem 0.15rem;
  font-size: 0;
  line-height: 0;
   background: #1C2932;
  border-bottom: 0.01rem solid #2D3A44;
  img {
     height: 0.14rem;
  }
  .classic-key {
    font-size: 0.1rem;
    line-height: 0.14rem;
    padding-left: 0.08rem;
  }
}
.key__bd {
  text-align: center;
  background: #1C2932;
}
.flex {
  display: flex;
}

.full-flex {
  flex: 1;
}
.top-border {
  border-top: 0.01rem solid #2D3A44;
}
.left-border {
  border-left: 0.01rem solid #2D3A44;
}
.key-content__lt {
  // width: 75%;
  flex: 1;
}
.key-content__rt {
  width: 25%;
  height: 1.84rem;
  font-size: @opFontSize;
}
.key-items {
  height: 0.46rem;
  overflow: hidden;
  box-sizing: border-box;
}
.key {
  flex: 1;
  height: 100%;
  .left-border();
  font-size: @keyFontSize;
}
.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
// .key-item {
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// }

.operate-height__quarter {
  height: 75%;
}
.operate-height__half {
  height: 50%;
}
.operate-height__three-quarter {
  height: 25%;
}
.operate-height__full {
  height: 0;
}

.comfirm-height__quarter {
  height: 25%;
}
.comfirm-height__half {
  height: 50%;
}
.comfirm-height__three-quarter {
  height: 75%;
}
.comfirm-height__full {
  height: 100%;
}

.key-close {
  .iconfont {
    padding-right: 0.04rem;
    font-size: 0.14rem;
  }
}
</style>
