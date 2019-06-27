import Vue from 'vue'
import Loading from '../components/loading'

const Mask = Vue.extend(Loading)

export default {
  bind: function (el, binding, vnode) {
    const text = el.getAttribute('loading-text')
    const background = el.getAttribute('loading-background')
    const tag = el.getAttribute('text-visible')
    const textVisible = tag !== 'no'
    const vm = vnode.context
    const mask = new Mask({
      el: document.createElement('div'),
      data: {
        text: (vm && vm[text]) || text,
        background: (vm && vm[background]) || background,
        textVisible: (vm && vm[textVisible] !== 'no') || textVisible
      }
    })
    el.instance = mask
    el.mask = mask.$el
    if (binding.value) {
      el.style.position = 'relative'
      if (el.mask) {
        el.instance.visible = true
      }
      el.appendChild(el.mask)
    } else {
      if (el.mask) {
        el.instance.visible = false
      }
    }
  },
  update: function (el, binding) {
    el.instance.setText(el.getAttribute('loading-text'))
    const tag = el.getAttribute('text-visible')
    const textVisible = tag !== 'no'
    el.instance.showText(textVisible)
    if (!el.mask.parentNode) {
      el.style.position = 'relative'
      el.appendChild(el.mask)
    }
    if (binding.oldValue !== binding.value) {
      el.instance.visible = binding.value
    }
  },
  unbind: function (el) {
    if (el.mask && el.mask.parentNode) {
      el.mask.parentNode.removeChild(el.mask)
    }
    if (el.instance) {
      el.instance.$destroy()
    }
  }
}
