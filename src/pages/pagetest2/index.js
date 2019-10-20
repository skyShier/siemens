import React from 'react';
import './index.css'
import { Row, Col, Button, Input, message } from 'antd';
import { Link } from "react-router-dom"
class pagetest2 extends React.Component{
  componentDidMount(){
    // 初始化用户信息
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    param.append('id', window.localStorage.id)
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/registered/getUserCenter",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      console.log(res)
      if(res.data.result === "SUCCESS"){
        console.log(res)
        this.setState({
          name:res.data.data.loginName,
          email:res.data.data.userEmail,
          proSize:res.data.data.projectSize,
          phone:res.data.data.phoneNumber,
          place:(res.data.data.usedProjectSize/res.data.data.projectSize),
          compName:res.data.data.companyName,
          compPlace:res.data.data.companyPlace,
          status:res.data.data.status,
          userType:res.data.data.userType,
          time:res.data.data.strCreateTime
        })
      }else if(res.data.code === "E0000"){
        message.info(res.data.msg)
        this.props.history.push({
          pathname:"/"
        })
      }else{ 
        message.error(res.data.msg)
      }
    })
  }
  // 判断用户权限
  renderUserType(type){
    if(type === "1"){
      return <span>超级管理员</span>
    }
    if(type === "2"){
      return <span>系统管理员</span>
    }
    if(type === "3"){
      return <span>超级用户</span>
    }
    if(type === "4"){
      return <span>普通用户</span>
    }
  }
  // 判断用户状态
  renderStatus(status){
    if(status === "0"){
      return <span>正常</span>
    }
    if(status === "1"){
      return <span>删除</span>
    }
    if(status === "2"){
      return <span>锁定</span>
    }
  }
  state = {
    isToggleOn: false,
    dispaly: 'none',
    phoneNumber:"",
    emailer:'',
    phoneer:'',
    email1:window.localStorage.userEmail,
    phone1:window.localStorage.userNum,
    copName1:window.localStorage.userCompName,
    copPlace1:window.localStorage.userCompPlace,
    errorEma:false,
    errorPho:false
  }
  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn:!prevState.isToggleOn,
      display:prevState.isToggleOn ? 'none': 'block',
      dis:prevState.isToggleOn ? 'block': 'none',
    }));
  }
  // 校验邮箱
  infoemail(){
    //是否是html代码片段
    let reg = /<|>/
    //邮箱校验
    let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if(this.refs.email.state.value === undefined || this.refs.email.state.value === ""){
      this.setState({
        emailer:"不能为空",
        errorEma:true
      })
      return false
    }else if(this.refs.email.state.value.slice(0,1) === " "){
      this.setState({
        emailer:"邮箱开头不能为空",
        errorEma:true
      })
      return false
    }else if(reg.test(this.refs.email.state.value)){
      this.setState({
        emailer:"无效值",
        errorEma:true
      })
      return false
    }else if(!emailReg.test(this.refs.email.state.value)){
      this.setState({
        emailer:"邮箱地址不合法",
        errorEma:true
      })
      return false
    }else{
      this.setState({
        emailer:"",
        errorEma:false
      })
      return true
    }
  }
  // 手机校验
  infophone(){
    //是否是html代码片段
    let reg = /<|>/
    //号码校验
    let phoneReg = /^1(3|4|5|7|8)\d{9}$/
    //手机号码校验
    if(this.refs.phone.state.value === undefined || this.refs.phone.state.value === "" ||this.refs.phone.state.value.slice(0,1) === " "){
      this.setState({
        phoneer:"不能为空",
        errorPho:true
      })
      return false
    }else if(reg.test(this.refs.phone.state.value)){
      this.setState({
        phoneer:"无效值",
        errorPho:true
      })
      return false
    }else if(!phoneReg.test(this.refs.phone.state.value) || this.refs.phone.state.value.length !== 11){
      this.setState({
        phoneer:"手机号码不合法",
        errorPho:true
      })
      return false
    }else{
      this.setState({
        phoneer:"",
        errorPho:false
      })
      return true
    }
  }
  handleClickOk = () => {
    if(this.infophone() && this.infoemail()){
      console.log('ok')
      // 修改用户相关信息用户名/电话/邮箱/公司名称/公司地址
      let param = new URLSearchParams()
      param.append('token', window.localStorage.token)
      param.append('id', window.localStorage.id)
      if(this.refs.email.state.value === this.state.email1 && this.refs.phone.state.value  === this.state.phone1 && this.refs.companyName.state.value === this.state.copName1 && this.refs.companyPlace.state.value === this.state.copPlace1){
        message.info("未修改信息")
      }else{
        param.append('userEmail', this.refs.email.state.value)
        param.append('phoneNumber', this.refs.phone.state.value)
        param.append('companyName', this.refs.companyName.state.value === '' ? '--' : this.refs.companyName.state.value)
        param.append('companyPlace', this.refs.companyPlace.state.value === '' ? '--' : this.refs.companyPlace.state.value)
        console.log(this.refs.companyPlace.state.value)
        window.$axios({
          method:"POST",
          url:"/ubc/siemens/console/registered/userCenter",
          data:param,
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
        }).then((res)=>{
          console.log(res)
          if(res.data.result === "SUCCESS"){
            console.log(res)
            message.success("您已成功修改信息")
            this.setState({
              email1:this.refs.email.state.value,
              phone1:this.refs.phone.state.value,
              copName1:this.refs.companyName.state.value,
              copPlace1:this.refs.companyPlace.state.value
            })
            this.componentDidMount()
          }else if(res.data.code === "E0000"){
            message.info(res.data.msg)
            this.props.history.push({
              pathname:"/"
            })
          }else{ 
            message.error(res.data.msg)
          }
        })
      }
      this.setState(prevState => ({
        isToggleOn:!prevState.isToggleOn,
        display:prevState.isToggleOn ? 'none': 'block',
        dis:prevState.isToggleOn ? 'block': 'none',
      }));
    }
    
  }

  render() {
    return (
      <div id="userInfo">
        <div className="link7">
          <Link to="/Home/main"><span style={{color:'#374B5A',marginRight:'5px'}}>首页</span></Link><span style={{color:'#374B5A'}}>></span>
          <span style={{color:'#879BAA',marginLeft:'5px'}}>个人中心</span>
        </div>
        <div className="userBox">
          <Row className="userList">
            <Col span={12}>
              <span>用户名：</span><span>{this.state.name}</span>
            </Col>
            <Col span={10}>
              <span>用户权限：</span>
              { this.renderUserType(this.state.userType) }
            </Col>
            <Col span={2}  style={{height:'25px'}}>
              <Button type="primary" style={{display: this.state.dis,height:'25px'}} onClick={this.handleClick.bind(this)}>编辑</Button>
              <Button type="primary" className="userInputBtn"  style={{display: this.state.display,height:'25px'}} onClick={this.handleClickOk.bind(this)}>完成</Button>
            </Col>
          </Row>
          <Row className="userList">
            <Col span={12}>
              <span>邮箱：</span>
              <span style={{display: this.state.dis}}>{this.state.email}</span>
              <span className="userInput" style={{display: this.state.display}}>
                <Input ref="email" defaultValue={this.state.email1} onBlur={this.infoemail.bind(this)} className={this.state.errorEma === true ? 'errorEma' : ''}></Input>
                <span className="error">
                  {this.state.emailer === "" ? "" : `${this.state.emailer}`}
                </span>
              </span>
              
            </Col>
            <Col span={12}><span>项目空间大小：</span><span>{this.state.proSize}</span></Col>
          </Row>
          <Row className="userList">
            <Col span={12}><span>城市：</span><span>北京</span></Col>
            <Col span={12}><span>空间使用率：</span><span>{parseInt(this.state.place)}%</span></Col>
          </Row>
          <Row className="userList">
            <Col span={12}>
              <span>手机号码：</span>
              <span style={{display: this.state.dis}}>{this.state.phone}</span>
              <span className="userInput" style={{display: this.state.display}}>
                <Input ref="phone" defaultValue={this.state.phone1} onBlur={this.infophone.bind(this)} className={this.state.errorPho === true ? 'errorPho' : ''}></Input>
                <span className="error">
                  {this.state.phoneer === "" ? "" : `${this.state.phoneer}`}
                </span>
              </span>
            </Col>
            {/* <Col span={12}><span>上级用户：</span><span>--</span></Col> */}
            <Col span={12}><span>注册时间：</span><span>{this.state.time}</span></Col>
          </Row>
          <Row className="userList">
            <Col span={12}>
              <span>公司名称：</span>
              <span style={{display: this.state.dis}}>{this.state.compName === 'undefined' ? '--' : this.state.compName}</span>
              <span className="userInput" style={{display: this.state.display}}><Input ref="companyName" defaultValue={this.state.copName1}></Input></span>
            </Col>
            <Col span={12}>
              <span>公司地址：</span>
              <span style={{display: this.state.dis}}>{this.state.compPlace === 'undefined' ? '--' : this.state.compPlace}</span>
              <span className="userInput" style={{display: this.state.display}}><Input ref="companyPlace"  defaultValue={this.state.copPlace1}></Input></span>
            </Col>
          </Row>
          {/* <Row className="userList"> 
            <Col span={12}><span>修改时间：</span><span>--</span></Col>
          </Row>
          <Row className="userList">
            <Col span={12}><span>所属国家：</span><span>--</span></Col>
            <Col span={12}><span>用户状态：</span>{this.renderStatus(this.state.status)}</Col>
          </Row> */}
        </div>
      </div>
    );
  }
}

export default pagetest2;
