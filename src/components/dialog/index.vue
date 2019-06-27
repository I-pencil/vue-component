<template>
  <div class="dialog" ref="dialog" :class="{ 'visible': !visible }" v-if="visible">
    <div class="shadow" ref="shadow" @touchmove.prevent>
      <div class="shadow-bg full-height" @click.stop="$emit('close')"></div>
    </div>
    <div class="dialog-container">
      <div class="dialog-wrapper primary-background primary-color">
        <div class="diglog__hd">
          <slot name="title">
            <p v-if="title" class="title">{{title}}</p>
          </slot>
        </div>
        <div class="dialog__bd">
          <div v-if="content" class="dialog-content second-color">{{ content }}</div>
          <slot v-else name="content"></slot>
        </div>
        <div class="dialog__ft">
          <div
            class="cancel"
            @click="$emit('cancel')"
            v-if="['ok-cancel', 'cancel'].includes(btnType)"
          >{{ cancelText }}</div>
          <div class="ok theme-background" v-if="['ok-cancel', 'ok'].includes(btnType)">
            <yd-button
              :loading="loading"
              :loading-txt="okText"
              size="large"
              @click.native="$emit('onOk')"
              bgcolor="#1c65a6"
              color="#fff"
              type="primary"
            >{{ okText }}</yd-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bt-dialog',
  props: {
    btnType: {
      type: String,
      default: 'ok-cancel',
      validator: (value) => {
        return ['ok-cancel', 'ok', 'cancel'].includes(value)
      }
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '温馨提示'
    },
    content: String,
    cancelText: {
      type: String,
      default: '取消'
    },
    okText: {
      type: String,
      default: '确定'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible (newVal) {
      if (newVal && this.appendToBody) {
        // this.addListeners()
        document.body.appendChild(this.$el)
      }
    }
  },
  mounted () {
    if (this.visible && this.appendToBody) {
      document.body.appendChild(this.$el)
    }
  },
  beforeDestroy () {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
<style lang="less" scoped>
.dialog {
}
.shadow{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1600;
  zoom: 1;
  overflow-y: scroll;
}
.shadow-bg {
  background: rgba(0, 0, 0, 0.5);
}
.dialog-container {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  z-index: 1601;
}
.dialog-wrapper {
  margin: 0 0.38rem;
}
.dialog-content {
  line-height: normal;
  font-size: @smallSize;
  text-align: center;
}

.dialog__bd {
  padding: 0 0.15rem;
}
.dialog__ft {
  display: flex;
}
.cancel, .ok {
  flex: 1;
  font-size: @largeSize;
  line-height: 0.3rem;
  text-align: center;
}

.cancel {
  background: #1C2932;
}

.cancel + .ok {
  margin-left: 0.15rem;
}

.ok /deep/ .yd-btn-primary, .ok /deep/ .yd-btn-block {
  height: 0.3rem;
  width: 100%;
  margin: 0;
  font-size: @largeSize;
  cursor: pointer;
  .yd-btn-rolling-large {
    height: 0.14rem;
    width: 0.14rem;
    i {
      margin-top: -0.08rem;
    }
  }
}

.visible {
  display: none;
}

.diglog__hd {
  padding: 0.3rem 0;
  text-align: center;
}
.dialog__ft {
  padding: 0.3rem 0.15rem 0.15rem;
}
</style>
