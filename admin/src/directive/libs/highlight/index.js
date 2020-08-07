import hljs from "highlight.js"; //导入代码高亮文件
import "highlight.js/styles/monokai-sublime.css"; //导入代码高亮样式

// const highlight = (el) => {
//     let highlight = el.querySelectorAll('pre code');
//     highlight.forEach((block) => {
//         hljs.highlightBlock(block)
//     })
// }

// export default highlight

export default {
  name: "highlight",
  bind(el, binding, vnode) {
    let highlight = el.querySelectorAll("pre code");
    highlight.forEach(block => {
      hljs.highlightBlock(block);
    });
  }
};
