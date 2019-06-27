<template>
  <div
    class="li-input flex"
    :class="{
      'li-input__primary': theme === 'primary',
      'li-input__default': theme === 'default'
    }"
  >
    <div class="li-input-prefix second-color">
      <slot name="prefix">
        <span class="prefix-icon flex-column full-height" v-if="prefixIcon"><i class="iconfont" :class="`${prefixIcon}`"></i></span>
      </slot>
    </div>
    <div class="li-input__bd full-height">
     <div class="flex-column full-height">
       <input
          :type="type"
          :placeholder="placeholder"
          :value="value"
          :readonly="readonly"
          class="li-input__inner"
          @blur="$blur"
          @change="$change"
          @focus="$focus"
          @input="$input"
          ref="input"
        >
     </div>
    </div>
    <div class="li-input-claer second-color full-height" v-if="showClear">
      <span class="suffix-icon flex-column full-height"><i class="iconfont icon-clear" @click="$claer"></i></span>
    </div>
    <div class="li-input-suffix second-color full-height">
      <div class="flex-column full-height">
        <slot name="suffix">
          <span class="suffix-icon" v-if="suffixIcon"><i class="iconfont" :class="`${suffixIcon}`"></i></span>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'li-input',
  model: {
    prop: 'value',
    event: 'change'
  },
  inject: {
    liForm: {
      default: ''
    },
    formItem: {
      default: ''
    }
  },
  props: {
    theme: {
      type: String,
      default: 'default',
      validator: (value) => {
        return ['default', 'primary'].includes(value)
      }
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    // 是否可清除
    clearable: {
      type: Boolean,
      default: true
    },
    // 输入框前置图标，可使用 slot
    prefixIcon: String,
    // 输入框后置图标，可使用 slot
    suffixIcon: String,
    value: [String, Number]
  },
  computed: {
    showClear () {
      return this.clearable && !this.readonly && this.value
    }
  },
  methods: {
    $blur (e) {
      this.$emit('blur', e)
      const value = e.target.value
      this.triggerValidate(value, 'blur')
    },
    $change (e) {
      const value = e.target.value
      this.$emit('change', value)
    },
    $focus (e) {
      this.$emit('focus', e)
    },
    $input (e) {
      const value = e.target.value
      this.$emit('input', value)
      this.$emit('change', value)
      this.triggerValidate(value, 'change')
    },
    $claer () {
      this.$emit('change', '')
    },
    triggerValidate (value, triggerTime) {
      if (!(this.liForm && this.formItem)) return
      const trigger = this.liForm.getTriggerTimer(this.formItem, triggerTime)
      if (trigger === triggerTime) {
        this.liForm.validateField(value, this.formItem)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.li-input {
  // line-height: 0.3rem;
  height: 0.40rem;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 0;
}
.li-input__primary {
  background: #18222B;
}
.li-input__default {
  background: #24333E;
  border: 0.01rem solid rgba(229, 229, 229, 0.2);
}
.flex {
  display: flex;
}
.li-input__bd {
  display: inline-block;
  font-size:12px;
  flex: 1;
}
.li-input__inner {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 0.1rem;
  padding-right: 0.12rem;
  font-size:12px;
  color: #fff;
}
.li-input__inner::placeholder {
  color: #66717A;
}

.li-input-prefix, .li-input-suffix {
  display: inline-block;
  font-size: 0;
}
.prefix-icon {
  padding-right: 0.08rem;
}
.li-input-claer {
  overflow: hidden;
}
.suffix-icon {
  padding-right: 0.16rem;
}
.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
