# 高英健的个人网站

计划使用域名 gaoyingjian.com

## 开发流程

1. 在根目录创建 `mysql-config.json`文件，格式如下：
```
{
  "mysql": {
    "host": "localhost",
    "port": 3306,
    "user": "username",
    "password": "password",
    "database": "database"
  }
}
```
2. `npm run vue-concat-debug`  生成调试用 vue 文件
3. `npm run start`  开启后端服务器
4. `npm run fe-debug`  开始监听前端代码修改
5. 打开 `http://localhost:3000/debug/`

## 上线准备

1. 修改 package.js 中的 version 版本号
2. `npm run fe-build`  生成正式环境代码