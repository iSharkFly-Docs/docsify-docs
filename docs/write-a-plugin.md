# 自定义插件

docsify 提供了一套插件机制，其中提供的钩子（hook）支持处理异步逻辑，可以很方便的扩展功能。

## 完整功能

```js
window.$docsify = {
  plugins: [
    function(hook, vm) {
      hook.init(function() {
         // 初始化完成后调用，只调用一次，没有参数。
      });

      hook.beforeEach(function(content) {
        // 每次开始解析 Markdown 内容时调用
        // ...
        return content;
      });

      hook.afterEach(function(html, next) {
        // 解析成 html 后调用。
        // beforeEach 和 afterEach 支持处理异步逻辑
        // ...
        // 异步处理完成后调用 next(html) 返回结果
        next(html);
      });

      hook.doneEach(function() {
        // 每次路由切换时数据全部加载完成后调用，没有参数。
        // ...
      });

      hook.mounted(function() {
        // 初始化并第一次加载完成数据后调用，只触发一次，没有参数。
      });

      hook.ready(function() {
        // 初始化并第一次加载完成数据后调用，没有参数。
      });
    }
  ]
};
```

!> 如果需要用 docsify 的内部方法，可以通过 `window.Docsify` 获取，通过 `vm` 获取当前实例。

## 例子


#### footer

给每个页面的末尾加上 `footer`

```js
window.$docsify = {
  plugins: [
    function(hook) {
      var footer = [
        '<hr/>',
        '<footer>',
        '<span><a href="https://github.com/QingWei-Li">cinwell</a> &copy;2017.</span>',
        '<span>Proudly published with <a href="https://github.com/docsifyjs/docsify" target="_blank">docsify</a>.</span>',
        '</footer>'
      ].join('');

      hook.afterEach(function(html) {
        return html + footer;
      });
    }
  ]
};
```


### Edit Button

```js
window.$docsify = {
  plugins: [
    function(hook, vm) {
      hook.beforeEach(function(html) {
        var url =
          'https://github.com/iSharkFly-Docs/docsify-docs/tree/master/docs/' +
          vm.route.file;
        var editHtml = '[📝 EDIT DOCUMENT](' + url + ')\n';

        return (
          editHtml +
          html +
          '\n----\n' +
          'Last modified {docsify-updated} ' +
          editHtml
        );
      });
    }
  ]
};
```

## 小技巧

### 获取 docsify 版本

```
console.log(window.Docsify.version)
```

当前版本: <span id='tip-version'>正在加载</span>

<script>
document.getElementById('tip-version').innerText = Docsify.version
</script>
