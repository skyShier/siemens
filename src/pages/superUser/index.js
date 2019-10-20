import React from 'react';
import './index.css'
import { Link } from "react-router-dom"
import { Table, Input, message } from 'antd';
import search from "../../img/search.svg"
class superUser extends React.Component{
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
      this.setState({
        data:res.data.data
      })
      if(res.data.result === "SUCCESS"){
      }else if(res.data.code === "E0000"){
        message.info(res.data.msg)
        this.props.history.push({
          pathname:"/"
        })
      }
    })
  }
  // 点击修改权限
  changePermis(userType,name){
      let param = new URLSearchParams()
      param.append('token', window.localStorage.token)
      param.append('updateLoginName', name)
      if(userType === "2"){
        param.append('updateUserType', '4')
        param.append('projectSize', 2)
      }else if(userType === "3"){
        param.append('updateUserType', '2')
        param.append('projectSize', 10000)
      }else if(userType === "4"){
        param.append('updateUserType', '2')
        param.append('projectSize', 10000)
      }
      window.$axios({
        method:"POST",
        url:"/ubc/siemens/console/registered/areaManageUser",
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
          message.info(res.data.msg)
        }
      })
  }
  // 通过userType判断列表用户权限
  useType(userType){
    if(userType === "2"){
      return (<span>地域管理员</span>)
    }else if(userType === "3"){
      return (<span><span>超级用户</span></span>)
    }else if(userType === "4"){
      return (<span>普通用户</span>)
    }
  }
  state = {
    confirmLoading: false,
  }
  // search
  searchsu(){
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    param.append('loginName', this.refs.searchsu.state.value)
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/registered/getUserList",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      if(res.data.result === "SUCCESS"){
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
    if(this.refs.searchsu.state.value === '' || this.refs.searchsu.state.value === undefined){
      this.componentDidMount()
    }
  }
  // table-------------------------------------------------------------------------------
  columns = [{
    title: '用户名',
    dataIndex: 'loginName',
    key: 'loginName'
  },{
    title: '用户角色',
    dataIndex: 'userType',
    key: 'userType',
    render: (record) => (
      <span>{this.useType(record)}</span>
    ),
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
            if(item.id === key.id && item.userType === "2"){
              return (<span key={item.id} style={{color:'#006486',cursor:'pointer'}} onClick={()=>this.changePermis(item.userType,item.loginName)}>降为普通用户</span>)
            }else if(item.id === key.id && item.userType === "3"){
              return (<span key={item.id}>
                        <span style={{color:'#006486',cursor:'pointer'}} onClick={()=>this.changePermis(item.userType,item.loginName)}>升为地域管理员</span>
                      </span>)
            }else if(item.id === key.id && item.userType === "4"){
              return (<span key={item.id} style={{color:'#006486',cursor:'pointer'}} onClick={()=>this.changePermis(item.userType,item.loginName)}>升为地域管理员</span>)
            }
            return ""
        })}
      </span>
    ),
  }]

  render() {
    return (
      <div id="superUser">
        <div className="link3">
          <Link to="/Home/main"><span style={{color:'#374B5A',marginRight:'5px'}}>首页</span></Link><span>></span>
          <span style={{color:'#879BAA',marginLeft:'5px'}}>用户管理</span>
        </div>
        <div className="userHead">
          <div className="userText" style={{display:'flex'}}>
            <Input placeholder="用户名" ref="searchsu" onBlur={this.qkhd.bind(this)}/>
            <div className='search' onClick={this.searchsu.bind(this)}><img src={search} alt="" style={{width:"16px"}}></img></div>
          </div>
        </div>
        {/* Tab */}
        <Table rowSelection={this.rowSelection} columns={this.columns} dataSource={this.state.data} bordered pagination={{pageSize:8}}/>
      </div>
    );
  }
}

export default superUser;
