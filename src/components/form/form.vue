<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
import { validator } from './validator'

export default {
  name: 'li-form',
  model: {
    prop: 'data',
    event: 'change'
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  provide () {
    return {
      liForm: this
    }
  },
  data () {
    return {
      error: {}
    }
  },
  methods: {
    // 重置表单
    resetFields () {
      let obj = {}
      Object.keys(this.data).forEach(key => {
        obj = {
          ...obj,
          [key]: null
        }
      })
      this.validateFields(true)
      this.$emit('change', obj)
    },
    // 校验整个表单
    async validateFields (reset = false) {
      let hasError = false
      const ruleKeys = Object.keys(this.rules)
      ruleKeys.forEach(ruleKey => {
        const value = this.data[ruleKey]
        const keyResult = this.validateField(value, ruleKey, reset)
        this.error = {
          ...this.error,
          [ruleKey]: keyResult
        }
        if (!hasError) {
          hasError = keyResult.length > 0
        }
      })
      return Promise.resolve(!hasError)
      // if (hasError) {
      //   return Promise.reject(this.error)
      // } else {
      //   return Promise.resolve()
      // }
    },
    // 校验表单字段
    // @params value 表单字段值
    // @params label 表单字段名称
    validateFieldValue (value, lable) {
      let hasError = false
      const keyResult = this.validateField(value, lable)
      hasError = keyResult.length > 0
      // if (hasError) {
      //   return Promise.reject(keyResult)
      // } else {
      //   return Promise.resolve()
      // }
      return Promise.resolve(!hasError)
    },
    validateField (value, prop, reset = false) {
      const [vNode] = this.$children.filter(vnode => prop in vnode.$refs)
      const rules = this.rules[prop]
      let keyResult = []
      if (vNode && rules) {
        if (!reset) {
          keyResult = validator(value, rules)
        }
        vNode.error = keyResult
      }
      return keyResult
    },
    getTriggerTimer (lable, triggerTime) {
      const rules = this.rules[lable]
      const ruleItem = rules.find(item => item.trigger === triggerTime)
      const { trigger = '' } = ruleItem || {}
      return trigger
    }
  }
}
</script>
