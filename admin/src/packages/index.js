
// 获取所有组件 (方式1: 一个个引入)
// import Home from './components/Home'
// import Detail from './components/Detail'
// const components = [Home, Detail]

// 获取所有组件 (方式2: 自动化引入)
const files = require.context('./components', true, /\.vue$/)
const components = files.keys().reduce((file, path) => {
  file.push(files(path).default)
  return file
}, [])

// 安装组件
const hailen = {
  install: function(Vue) {
    components.forEach(c => {
      if (!c.name) throw new Error("required a components name field(such as: name:'xxx')")
      Vue.component(c.name, c)
    })
  }
}

export default hailen
