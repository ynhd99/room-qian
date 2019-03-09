---
order: 1
title:
  zh-CN: 自定义样式
  en-US: Customizing Layout
---

## zh-CN

树状图支持高度自定义的结点展示，你可以根据自己的需要去定义结点的展示形式，也可以分别定义根结点和子节点的展现。

## en-US

Customizing Layout

````jsx
import { NodeTree } from 'hermes-react';

const treeStyle = {
  rootSize: {
    width: 120,
    height: 40,
  },
  childSize: {
    width: 200,
    height: 80,
  },
  divid: {
    parent: 60,
    brother: 30,
  },
};

function createData() {
  let length = Number.parseInt(Math.random() * 5, 10) + 1;
  let arr = [];
  let names= ["张三","李四","王二","麻子"];
  let genders = ["男", "女"];
  let belongs = ["技术部", "人力资源部", "后勤部", "公司高层"];
  let emails = ["www.tom@demo.com","www.tony@demo.com","www.jack@demo.com","www.marry@demo.com"];

  for(let i=0; i< length; i++) {
    arr.push({
      name: names[Number.parseInt(Math.random() * 4, 10)],
      gender: (Math.random() > 0.5) ? genders[0] : genders[1],
      belong: belongs[Number.parseInt(Math.random() * 4, 10)],
      email: emails[Number.parseInt(Math.random() * 4, 10)]
    });
  }

  return arr;
}

const content = (
  <div id="container" style={{width: 800, height: 600, margin: '0 auto'}}>
    <NodeTree
      {...treeStyle}
      parentId="container"
      renderNode={(obj) => {
        if(obj.isRoot === true) {
          return obj.text;
        } else {
          const containerStyle = {
            width: "100%",
            height: "100%"
          };
          const titleStyle = {
            height: 30,
            lineHeight: "30px",
            fontSize: "20px",
            textAlign: "left",
            paddingLeft: 15
          }
          const itemStyle = {
            height: 24,
            lineHeight: "24px",
            textAlign: "left",
            paddingLeft: 15,
            fontSize: "12px",
          }

          return (
            <div style={containerStyle}>
              <h4 style={titleStyle}>{obj.name}</h4>
              <ul>
                <li style={itemStyle}>性别：{obj.gender}</li>
                <li style={itemStyle}>邮箱：{obj.email}</li>
              </ul>
            </div>
          );
        }
      }}
      queryKeys={['name']}
      url="http://test.com"
      extraMsg="belong"
      onLoadData={(obj) => {
        if(obj === undefined) {  
          /*
            拉取数据的回调会在控件初始化的时候触发一次，用来拿到根结点的信息, 我们可以在这里对根结点进行特殊处理
          */
          return new Promise((resolve) => {
            let data = [{
              query: 0,
              text: "开始",
              percent: "100%",
              isRoot: true
            }];
            resolve(data);
          });
        }

        /*
          我们可以从这个回调中异步的获取数据，函数的参数就是我们点击结点的数据信息，可以通过配置queryKeys拿到后台所需要的query值
          例如
          let query = '';
          this.props.queryKeys.forEach((item) => {
            query += `${item}=${obj[item]}`;
          });

          let url = `${this.props.url}?${query}`
          return new Promise(ajax.get(url).done((d) => {resolve(d)}));
        */

        return new Promise((resolve) => {
          let data = createData();
          resolve(data);
        });
      }}
    />
  </div>
);

ReactDOM.render(content, mountNode);
````
