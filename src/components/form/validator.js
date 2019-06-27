export const validator = (value, rules) => {
  const result = []
  rules.forEach(rule => {
    let msg = ''
    const {
      len = 0, // 字段长度
      max = 0, // 最大长度
      min = 0, // 最小长度
      message = '', // 校验文案
      pattern = '', // 正则表达式校验
      type = 'string',
      required = false,
      validator
    } = rule
    if (required && !value) {
      msg = message || '请输入'
    }
    if (type === 'string' && typeValidator(value) && value) {
      const length = String(value).length || 0
      msg = lengthValidator(length, min, max, len, message)
    }
    if (pattern) {
      const isReg = typeValidator(pattern, 'RegExp')
      if (!isReg) {
        msg = '正则校验规则不正确'
      }
      if (!pattern.test(value)) {
        msg = message || '请输入正确的值'
      }
    }
    if (validator && typeof validator === 'function') {
      msg = validator(value, rules)
    }
    if (msg) {
      result.push(msg)
    }
  })
  return result
}

/*
* const dataTypes = ['string', 'number', 'boolean', 'email']
*/
const baseTypes = ['string', 'number', 'boolean']
const typeValidator = (value, type = 'string') => {
  if (baseTypes.includes(type)) {
    const valueType = typeof value
    return baseTypes.includes(valueType)
  } else if (type === 'array') {
    return Array.isArray(value)
  } else if (type === 'email') {
    const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    return reg.test(value)
  } else if (type === 'RegExp') {
    return value instanceof RegExp
  }
}

const lengthValidator = (length, min, max, len, message) => {
  if (len && len !== length) {
    return message || `请输入${len}个字符`
  }
  if (min && length < min) {
    return message || `至少输入${min}个字符`
  }
  if (max && length > max) {
    return message || `最多输入${max}个字符`
  }
  if (min && max && (length < min || length > max)) {
    return message || `请输入${min} ~ ${max}个字符`
  }
  return ''
}
