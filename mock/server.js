//express搭建服务器
//引入
const express = require('express')

//引入mockjs
const Mock = require('mockjs')
//random
const Random = Mock.Random

//实例化app
const app = express()
// 解决跨域
// use是express中的一个中间件
app.use((req, res, next) => {
  //设置响应头
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers', 'content-type,token')
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  //调用下一个中间件
  next()
})

//请求方式get
//参数1路径---2接收req请求对象和res响应对象
app.get('/admin/edu/subject/:page/:limit', (req, res) => {
  //req 请求对象
  let {
    page,
    limit
  } = req.params //从浏览器中获取路由参数


  /* const data = {
    total: 100,
    items: [{}, {}]
  } */

  const data = Mock.mock({
    //随机范围值
    total: Random.integer(limit, limit * 2),
    [`items|${limit}`]: [{
      '_id|+1': 1,
      title: '@ctitle(2,5)', //2到5个中文
      parentId: 0
    }]
  })

  //res 响应对象
  //后台会返回json的字符串
  res.json({
    code: 20000,
    success: true,
    data,

    message: ""
  })
})

app.listen(8888, (err) => {
  if (err) {
    return console.log('服务器启动失败')

  }
  console.log('服务器启动成功http://localhost:8888')
})