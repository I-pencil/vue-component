<template>
  <div>
  </div>
</template>

<script>
export default {
 name: 'Loading',
  data() {
    return {
      text: '',
      visible: false,
      background: null,
      textVisible: true
    }
  },
  components: {},
  mounted() {},
  methods: {
    setText (text) {
      this.text = text
    },
    showText (visible) {
      this.textVisible = visible
    }
  }
}
</script>

<style scoped lang="less">

</style>
