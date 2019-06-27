<template>
  <div class="li-form-item" :class="{ flex: labelPosition === 'left' }" :ref="prop">
    <div class="li-form-item__label" :style="{ width: labelWidth }">
      <slot name="label">
        <span v-if="label" :style="{ color: labelColor }" :class="`label-${labelPosition}`">{{ label }}</span>
      </slot>
    </div>
    <div class="li-form-item__bd">
      <slot></slot>
      <span class="warning-color form-msg">{{ msg }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'li-form-item',
  inject: {
    liForm: {
      default: ''
    }
  },
  provide () {
    return {
      liForm: this.liForm,
      formItem: this.prop
    }
  },
  props: {
    label: String,
    labelPosition: {
      type: String,
      default: 'top',
      validator: (val) => {
        return ['top', 'left'].includes(val)
      }
    },
    labelColor: {
      type: String,
      default: '#66717A'
    },
    prop: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: 'auto'
    }
  },
  data () {
    return {
      error: []
    }
  },
  computed: {
    msg () {
      return this.error[0]
    }
  }
}
</script>
<style lang="less" scoped>
.li-form-item {
  // padding-bottom: 0.2rem;
}
.flex {
  display: flex;
}
.li-form-item__label {
  font-size: 0;
  & span {
    display: inline-block;
  }
}
.label-top {
  font-size:12px;
  padding-bottom: 10px;
}
.label-left {
  // line-height: 0.46rem;
  line-height: 0.3rem;
  font-size:12px;
  margin-right: 10px;
}
.li-form-item__label__inner {
  font-size:12px;
}
.li-form-item__bd {
  flex: 1;
  position: relative;
}
.form-msg {
  position: absolute;
  // top: 0;
  // top: -100%;
  left: 0;
  z-index: 2;
  bottom: 0px;
  // line-height: 0.3rem;
  transform: translateY(100%);
  zoom: 1;
  font-size:12px;
}
</style>
