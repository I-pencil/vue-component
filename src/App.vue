<template>
  <div id="app">
    <li-form>
      <li-form-item label="姓名" labelPosition="left">
        <li-input></li-input>
      </li-form-item>
      <li-form-item label="手机号" labelPosition="left">
        <li-input></li-input>
      </li-form-item>
      <li-form-item label="邮箱" labelPosition="left">
        <li-input></li-input>
      </li-form-item>
    </li-form>
  </div>
</template>

<script>
import Form from './components/form/form'
import FormItem from './components/form/form-item'
import Input from './components/input'

export default {
  name: 'app',
  data() {
    return {
      form: {
        name: '', // 姓名
        phone: '', // 手机号
        email: ''  // 邮箱
      }
    }
  },
  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input
  }
}
</script>

<style>
@import './assets/styles/index';

#app {
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  /* margin-top: 60px; */
  background: #131b22;
}
</style>
