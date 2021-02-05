import React, { Component } from "react";
import { Button, Table } from 'antd';

//导入图标
import { PlusOutlined,DeleteRowOutlined,FormatPainterOutlined } from '@ant-design/icons'
//导入样式
import './index.less'
//导入mockapi
import {reqGetSubjectList} from '@api/edu/subject'


const columns = [
  //columns 表格的列
  //title -- 名称
  
  { title: '分类名称', dataIndex: 'title', key: 'title' },
  
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: () => (<>
      <Button type="primary" className="update-btn"><FormatPainterOutlined /></Button>,
      <Button type="danger"><DeleteRowOutlined /></Button>
    </>),
    //列的宽度
    width:200
  },
];

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];

export default class Subject extends Component {
  //选中的页码数
  currentPage=1
  state={
    subject:{}//用于存储数据
  }
  componentDidMount(){
    this.getSubjectList(1,10)
  }
  //调用接口获取api里获取数据
  getSubjectList=async (page,limit)=>{
    //调用mock api
    const result =await reqGetSubjectList(page,limit)
    console.log(result)
    this.setState({
      subject:result
    })
  }
  //改变页数调用的回调函数参数 页数和每页几条数
  handleChangePage=(page,pageSize)=>{
    //console.log(page,pageSize)
    this.getSubjectList(page,pageSize)
   this.currentPage= page //选中的高亮
  }
  //点击每页显示多少条数据 页数和每页几条数
  handleChangeSize=(current, size)=>{
    this.getSubjectList(current, size)
    this.currentPage = current //选中的高亮
  }

  render() {
    return (
      <div className="subject">

        <Button type="primary" className="subject-btn" > <PlusOutlined />新建</Button>
        <Table
          columns={columns}
          expandable={{
            //展开的数据列表
            expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
            //是否可展开
            rowExpandable: record => record.name !== 'Not Expandable',
          }}
          dataSource={this.state.subject.items}
          rowKey = '_id'
          pagination={{
            total: this.state.subject.total, //total表示数据总数
            showQuickJumper: true, //是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数据数量
            pageSizeOptions:['5','10','15','20'], //设置每天显示数据数量的配置项
            //defaultPageSize:5, //每页默认显示数据条数 默认是10,
            onChange: this.handleChangePage, //页码改变的时候触发,
            //onShowSizeChange:(current,size)=>{} //一页展示几条数据变化时触发 current 当前页码, size 一页几条
            onShowSizeChange:this.handleChangeSize,
            current:this.currentPage
         }}
        />
      </div>
    )
  }
}
