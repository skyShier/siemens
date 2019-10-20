import React from 'react';
import './index.css'
import { Link } from "react-router-dom"
import { Table, Button, Input, Modal, Row, Col, message } from 'antd';
import search from "../../img/search.svg"
class localUser extends React.Component{
  // 初始化
  componentDidMount(){
    // 获取用户列表
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
  // 点击修改权限
  changePermis(name){
    console.log(name,111)
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    param.append('updateUser', name)
    param.append('projectSize', 2)
    param.append('mark', '1')
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/registered/superUser",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      if(res.data.result === "SUCCESS"){
        message.info('您已修改成功')
        this.componentDidMount()
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
  state = {
    //权限
    dispaly: 'block',
    // 弹出框
    visible: false,
    confirmLoading: false,
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
    render: (key) => (
      <span>
        {this.state.data.map((item)=>{
            // if(item.key === key.key && item.userRoles === "普通用户"){
            //   return (<span key={item.key} style={{color:'#006486'}}>提升为超级用户</span>)
            // }else 
            if(item.id === key.id && item.userType === "3"){
              return (<span key={item.id} style={{color:'#006486',cursor:'pointer'}} onClick={()=>this.changePermis(item.loginName)}>降为普通用户</span>)
            }
            return ""
        })}
      </span>
    ),
  }]
  // 弹出框----------------------------------------------------------------------------------
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    param.append('updateUser',this.refs.user.state.value ? this.refs.user.state.value :"")
    // param.append('updateUserEmail',this.refs.address.state.value ? this.refs.address.state.value : "")
    // param.append('updatePhone',this.refs.phone.state.value ? this.refs.phone.state.value : "")
    param.append('projectSize', 100)
    param.append('mark', '0')
    // 添加一个响应拦截器
    window.$axios.interceptors.response.use(function (response) {
      // Do something with response data
      console.log(1111111)
      return response;
    }, function (error) {
      // Do something with response error
      message.error('系统异常')
      return Promise.reject(error);
    });
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/registered/superUser",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      if(res.data.result === "SUCCESS"){
        console.log(res)
        this.componentDidMount()
        message.info('您已成功添加超级用户');
        this.setState({
          visible: false,
        });
      }else if(res.data.code === "E0000"){
        message.info(res.data.msg)
        this.props.history.push({
          pathname:"/"
        })
      }else{
        message.info(res.data.msg)
      }
    })
    // console.log(this.refs.username.state.value)
    // console.log(this.refs.phone.state.value)
    // console.log(this.refs.address.state.value)
    // let num = this.state.data.length+1
    // let json = {
    //   key: num,
    //   loginName:this.refs.username.state.value ? this.refs.username.state.value :"--",
    //   userEmail:this.refs.address.state.value ? this.refs.address.state.value : "--",
    //   phoneNumber:this.refs.phone.state.value ? this.refs.phone.state.value : "--",
    //   lastTime:'2018-12-24 16:23:13',
    //   operation:'',
    // }
    // let data = this.state.data
    // data.unshift(json)
    // this.setState({
    //   data:data
    // })
    
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  // search
  searchlu(){
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    param.append('loginName', this.refs.searchlu.state.value)
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
    if(this.refs.searchlu.state.value === '' || this.refs.searchlu.state.value === undefined){
      this.componentDidMount()
      console.log(this.refs.searchlu.state.value)
    }
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
            <Input placeholder="用户名" ref="searchlu" onBlur={this.qkhd.bind(this)}/>
            <div className='search' onClick={this.searchlu.bind(this)}><img src={search} alt="" style={{width:"16px"}}></img></div>
          </div>
          <div>
            <Button type="primary" onClick={this.showModal.bind(this)}>添加超级用户</Button>
            <Modal
              title="添加超级用户"
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

export default localUser;
