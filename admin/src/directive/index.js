import Vue from "vue";

const files = require.context("./libs", true, /\.js$/);
const directives = files.keys().reduce((file, path) => {
  file.push(files(path).default);
  return file;
}, []);

// 全局注册指令
directives.forEach(directive => {
  if (!directive.name)
    throw new Error("required a directives name field(such as: name:'xxx')");
  Vue.directive(directive.name, directive);
});
