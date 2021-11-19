# 创新素质测评系统

## 简介

> 软件工程课设第一小组

> 小组成员：刘羊周、罗雨骁、左浩岚、喻如辰、陈志恒

## 技术选型

项目采用B/S架构，前端使用Vue + Element UI，服务端采用Express，数据库采用Sqlite，部署使用Nginx+腾讯云

### server

#### 起步

```bash
# 进入server目录
cd server

# 安装依赖
npm install

# 运行,项目运行在localhost:3000端口
npm start
```

#### 文件结构

##### 文件夹

1. db
   * 对可能用到的数据库操作（增删查改)类型sql语句进行promise封装
2. sql
   * 存放.sql文件，对应.db里面表内容
   * 实际并无用，执行在sqlite3命令行进行
3. routes
   * 路由文件
   * 每个路由文件需要在app.js进行引入和app.use()
4. utils
   * 一个工具函数
   * 觉着有需要，在此进行定义声明
5. test
   * 无实际用处，存放我在本地进行测评函数正确性的一些js文件

##### 重要文件

 1. app.js

    路由需要在此进行app.use()

    ![image-20211117130155431](C:\Users\86159\AppData\Roaming\Typora\typora-user-images\image-20211117130155431.png)

    ![image-20211117130210814](C:\Users\86159\AppData\Roaming\Typora\typora-user-images\image-20211117130210814.png)

    

 2. lib.db

    项目数据库文件

#### 项目依赖

1. sqlite3

   > 数据库操作

2. nodemailer

   >  邮箱服务（验证用户邮箱的有效性）

#### 约定

 1. 新增文件严格按照 **文件结构**

 2. 路由按功能进行划分，功能块和js文件一一对应

 3. 数据库建表，修改表操作需要手动在sqlite3中进行，慎重，需要集体讨论

 4. client发送请求均为post请求，传输格式为json，响应使用resp.json({'key':'value[,'key2',value2',…]})

    ![image-20211117130756437](C:\Users\86159\AppData\Roaming\Typora\typora-user-images\image-20211117130756437.png)

### client

#### 起步

```bash
cd evaluation

# 安装依赖
npm install

# 运行,项目默认运行在localhost:8080端口
npm run dev
```

### 部署（暂时不用）

1. Nginx配置文件

![image-20211117131145293](C:\Users\86159\AppData\Roaming\Typora\typora-user-images\image-20211117131145293.png)

 2. 文件上传

    ```bash
    cd evaluation
    
    npm run build # 打包，生成dist文件夹
    ```

    将dist文件夹放入server下，并在app.js中使用

    ![image-20211117131606941](C:\Users\86159\AppData\Roaming\Typora\typora-user-images\image-20211117131606941.png)

    通过xftp将本地server文件夹上传至云服务器

    云服务中运行，挂后台

3. 外界便可以在浏览器通过http://1.14.108.207进行访问

### 记录问题

1. 跨域

2. set-cookie跨域

   https://yu-jack.github.io/2019/06/02/ajax-with-session/

   
