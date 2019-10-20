import React from 'react';
import './index.css'
import { Link } from "react-router-dom"
import { Table, Button, Input, Modal, Row, Col, message ,Popconfirm} from 'antd';
import search from "../../img/search.svg"
class UserPage extends React.Component{
  // 获取用户列表
  componentDidMount(){
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/registered/getUserList",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      console.log(res)
      this.setState({
        data:res.data.data
      })
      console.log(this.state.data)
      if(res.data.result === "SUCCESS"){
        console.log(res)
      }else if(res.data.code === "E0000"){
        message.info(res.data.msg)
        this.props.history.push({
          pathname:"/"
        })
      }
    })
  }
  // 新增弹出框
  state = {
    //权限
    dispaly: 'block',
    // 弹出框
    visible: false,
    confirmLoading: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  // 添加子用户
  handleOk = () => {
    this.setState({
      visible: false,
    });
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    param.append('updateUser',this.refs.user.state.value ? this.refs.user.state.value :"")
    // param.append('updateUserEmail',this.refs.address.state.value ? this.refs.address.state.value : "")
    // param.append('updatePhone',this.refs.phone.state.value ? this.refs.phone.state.value : "")
    param.append('projectSize', 2)
    param.append('mark', '0')
    console.log(param)

    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/registered/generalUser",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      if(res.data.result === "SUCCESS"){
        console.log(res)
        this.componentDidMount()
        message.info('您已成功添加用户');
      }else if(res.data.code === "E0000"){
        message.info(res.data.msg)
        this.props.history.push({
          pathname:"/"
        })
      }else{
        console.log(res)
        message.info(res.data.msg)
      }
    })
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  // search
  searchup(){
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    param.append('loginName', this.refs.searchup.state.value)
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/registered/getUserList",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      if(res.data.result === "SUCCESS"){
        console.log(res)
        this.setState({
          data:res.data.data
        })
      }else if(res.data.code === "E0000"){
        message.info(res.data.msg)
        this.props.history.push({
          pathname:"/"
        })
      }
      this.setState({
        rowId: undefined,
      });
    })
  }
  // 取消搜索
  qkhd(){
    if(this.refs.searchup.state.value === '' || this.refs.searchup.state.value === undefined){
      this.componentDidMount()
      console.log(this.refs.searchup.state.value)
    }
  }
  // table-------------------------------------------------------------------------------
  columns = [{
    title: '用户名',
    dataIndex: 'loginName',
    key: 'loginName'
  }, {
    title: '邮箱',
    dataIndex: 'userEmail',
    key: 'userEmail',
  }, {
    title: '电话',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  }, {
    title: '上次登录时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    title: '操作',
    key: 'operation',
    render: (record) => (
      <Popconfirm title="确定删除吗？" onConfirm={()=>{this.remove(record.key,record.loginName)}}>
        <span className="delete">移除</span>
      </Popconfirm>
    ),
  }]
  remove(key,name){
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    param.append('updateUser',name)
    param.append('projectSize', 2)
    param.append('mark', '1')
    console.log(param)

    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/registered/generalUser",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      if(res.data.result === "SUCCESS"){
        console.log(res)
        this.componentDidMount()
        message.info('您已成功移除用户');
      }else{
        console.log(res)
        message.info(res.data.msg)
      }
    })
    // let arr = []
    // this.state.data.forEach((item)=>{
    //   if(key !== item.key){
    //     arr.push(item)
    //   }
    // })
    // this.setState({
    //   data:arr
    // })
  }

  render() {
    const { visible} = this.state;//弹出
    return (
      <div id="UserPage">
        <div className="link3">
          <Link to="/Home/main"><span style={{color:'#374B5A',marginRight:'5px'}}>首页</span></Link><span>></span>
          <span style={{color:'#879BAA',marginLeft:'5px'}}>用户管理</span>
        </div>
        <div className="userHead">
          <div className="userText" style={{display:'flex'}}>
            <Input placeholder="用户名" ref="searchup" onBlur={this.qkhd.bind(this)}/>
            <div className='search' onClick={this.searchup.bind(this)}><img src={search} alt="" style={{width:"16px"}}></img></div>
          </div>
          <div>
            <Button type="primary" onClick={this.showModal.bind(this)}  style={{display: this.state.display}}>添加普通用户</Button>
            <Modal
              title="添加子用户"
              visible={visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              className="modalus"
            >
              {/* <Alert message="特别说明：以下字段，只需一个不为空就可以进行添加。" type="info" showIcon /> */}
              <Row type="flex" justify="center" style={{marginTop:'20px',marginBottom:'20px'}}>
                <Col span={4} className="right">用户信息：</Col>
                <Col span={18}><Input placeholder="请输入用户名/手机号/邮箱地址" ref="user"/></Col>
              </Row>
              {/* <Row type="flex" justify="center" style={{marginTop:'16px'}}>
                <Col span={4} className="right">手机号：</Col>
                <Col span={18}><Input placeholder="请输入手机号" ref="phone"/></Col>
              </Row>
              <Row type="flex" justify="center" style={{marginTop:'16px'}}>
                <Col span={4} className="right">邮箱地址：</Col>
                <Col span={18}><Input placeholder="请输入邮箱地址" ref="address"/></Col>
              </Row> */}
              
            </Modal>
          </div>
        </div>
        {/* Tab */}
        <Table rowSelection={this.rowSelection} columns={this.columns} dataSource={this.state.data} bordered pagination={{pageSize:10}}/>
      </div>
    );
  }
}

export default UserPage;
