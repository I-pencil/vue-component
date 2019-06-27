<template>
  <div
    class="bt-input-number flex"
    :class="{
      'bt-input-number__primary': theme === 'primary',
      'bt-input-number__default': theme === 'default'
    }"
  >
    <div class="bt-input-prefix second-color">
      <slot name="prefix">
        <span class="prefix-icon flex-column full-height" v-if="prefixIcon"><i class="iconfont" :class="`${prefixIcon}`"></i></span>
      </slot>
    </div>
    <div @keydown="$keydown" class="bt-input-number__bd full-height">
      <div class="flex-column full-height">
        <input
          class="bt-input-number__inner"
          :placeholder="placeholder"
          :value="value"
          :min="min"
          :max="max"
          :readonly="readonly"
          @blur="$blur"
          @change="$change"
          @focus="$focus"
          @input="$input"
        />
      </div>
    </div>
    <div class="bt-input-claer second-color full-height" v-if="showClear">
      <span class="suffix-icon flex-column full-height"><i class="iconfont icon-clear" @click="$claer"></i></span>
    </div>
    <div class="bt-input-suffix second-color full-height">
      <div class="flex-column full-height">
        <slot name="suffix">
          <span class="suffix-icon" v-if="suffixIcon"><i class="iconfont" :class="`${suffixIcon}`"></i></span>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>

const maxLength = Number.MAX_SAFE_INTEGER.toString().length // 整数最大长度

export default {
  name: 'InputNumber',
  model: {
    prop: 'value',
    event: 'change'
  },
  inject: {
    btForm: {
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
    value: {
      type: [Number, String],
      default: null
    },
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    min: {
      type: Number,
      default: Number.MIN_SAFE_INTEGER
    },
    // 数字精度
    precision: {
      type: Number,
      default: 2
    }
  },
  computed: {
    showClear () {
      return this.clearable && !this.readonly && typeof this.value === 'number'
    }
  },
  methods: {
    $blur (e) {
      const inputValue = e.target.value
      this.focusing = false
      let value = Math.min(inputValue, this.max)
      value = Math.max(value, this.min)
      this.$emit('blur', e)
      this.$emit('change', Number(value))
      this.triggerValidate(value, 'blur')
    },
    $change (e) {
      const value = e.target.value
      this.$emit('change', Number(value))
    },
    $focus (e) {
      this.$emit('focus', e)
    },
    $input (e) {
      const value = e.target.value
      this.$emit('input', Number(value))
      this.$emit('change', Number(value))
      this.triggerValidate(value, 'change')
    },
    $claer () {
      this.$emit('change', null)
    },
    $keydown (event) {
      this.$validKey(event)
      this.$validPrecision(event)
    },
    $validKey (event) {
      const testKey = /[0-9.]/.test(event.key) || event.key === 'Backspace'
      if (!testKey) {
        event.preventDefault()
      }
      if (this.precision === 0 && event.key === '.') {
        event.preventDefault()
      }
    },
    $validPrecision (event) {
      const inputValue = event.target.value
      if (inputValue.length > maxLength) {
        event.preventDefault()
      }
      const pointIndex = inputValue.indexOf('.')
      if (pointIndex !== -1) {
        const point = inputValue.slice(pointIndex + 1)
        const pointLength = point ? point.length : 0
        if ((pointLength >= this.precision) && event.key !== 'Backspace') {
          event.preventDefault()
        }
      }
    },
    triggerValidate (value, triggerTime) {
      if (!(this.btForm && this.formItem)) return
      const trigger = this.btForm.getTriggerTimer(this.formItem, triggerTime)
      if (trigger === triggerTime) {
        this.btForm.validateField(value, this.formItem)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.flex {
  display: flex;
}
.bt-input-number {
  // line-height: 0.3rem;
  height: 0.48rem;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 0;
}

.bt-input-number__primary {
  background: #18222B;
}
.bt-input-number__default {
  background: #24333E;
  border: 0.01rem solid rgba(229, 229, 229, 0.2);
}
.bt-input-number__bd {
  display: inline-block;
  position: relative;
  font-size: @enlargeSize;
  flex: 1;
}
.bt-input-number__inner {
  width: 100%;
  padding-left: 0.1rem;
  padding-right: 0.12rem;
  // padding-top: 0.13rem;
  // padding-bottom: 0.13rem;
  // line-height: 0.3rem;
  line-height: 1;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bt-input-number__inner::placeholder {
  color: #66717A;
  // padding-left: 0.1rem;
}

.bt-input-prefix, .bt-input-suffix {
  display: inline-block;
  font-size: 0;
}
.prefix-icon {
  padding-right: 0.08rem;
}
.bt-input-suffix {
  // padding-right: 0.16rem;
}
.bt-input-claer {
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
