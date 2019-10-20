import React from 'react';
import './index.css'
import { Button, Row, Col, Input, Layout,message, Select } from 'antd'
import { Link } from "react-router-dom"

import logo from "../../img/logo.svg"
const {Footer} = Layout;
const Option = Select.Option;

class Login extends React.Component{
  state={
    username:"", //admin
    password:"",//lgw362QJ
    errorName: false,
    errorPas:false,
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }
  // 用户名校验
  loginname(){
    //是否是html代码片段
    let reg = /<|>/
    //数字，字母，下划线校验
    let numReg = /^[A-Za-z0-9_]+$/
    //空格校验
    let spaceReg = / /
    //用户名校验  todo当前用户名是否被注册
    if(this.refs.username.state.value === undefined || this.refs.username.state.value === "" ||this.refs.username.state.value.slice(0,1) === " "){
      this.setState({
        username:"用户名称必填",
        errorName:true
      })
      return
    }else if(reg.test(this.refs.username.state.value)){
      this.setState({
        username:"无效值",
        errorName:true
      })
      return
    }else if(spaceReg.test(this.refs.username.state.value) || !numReg.test(this.refs.username.state.value)){
      this.setState({
        username:"请用英文字母、数字、下划线及它们的组合",
        errorName:true
      })
      return
    }else if(this.refs.username.state.value.length<1 || this.refs.username.state.value.length>15){
      this.setState({
        username:"用户名长度必须在1-15个之间",
        errorName:true,
      })
      return
    }else{
      this.setState({
        username:"",
        errorName:false,
      })
      return
    }
  }
  //密码校验
  loginpassword(){
    //空格校验
    let spaceReg = / /
    //密码校验
    if(this.refs.password.state.value === undefined || this.refs.password.state.value === "" || this.refs.password.state.value.slice(0,1) === " "){
      this.setState({
        password:"密码必填",
        errorPas:true,
      })
      return
    }else if(spaceReg.test(this.refs.password.state.value)){
      this.setState({
        password:"密码不能包含空格",
        errorPas:true,
      })
      return
    }else{
      this.setState({
        password:"",
        errorPas:false,
      })
      return
    }
    // else if(this.refs.password.state.value.length<8 || this.refs.password.state.value.length>25){
    //   this.setState({
    //     password:"密码长度必须必须在8-25个之间"
    //   })
    //   return
    // }
  }
  keypress(e) {
    console.log(e.nativeEvent.keyCode)
    if(e.nativeEvent.keyCode === 13) {
      console.log(111)
      this.login()
      // this.login()
    }
    // console.log(e.charCode)
    // if (e.charCode !== 13) return
    // this.login()
    // console.log(22)
  }
  login(){
    this.loginname()
    this.loginpassword()

    setTimeout(() => {
      if(!this.state.username && !this.state.password){
        let param = new URLSearchParams()
        param.append('loginName', this.refs.username.state.value)
        param.append('password', this.refs.password.state.value)
        this.setState({
          loname:this.refs.username.state.value,
          lopassWord: this.refs.password.state.value
        });
        window.$axios({
          method:"POST",
          url:"/ubc/siemens/console/registered/login",
          data:param,
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
        }).then((res)=>{
          console.log(res)
          if(res.data.msg === ""){
            console.log(res)
            // 本地存权限值/用户id/token/用户名/密码/邮箱
            window.localStorage.userType = res.data.data.sysUbcUser.userType
            window.localStorage.id = res.data.data.sysUbcUser.id
            window.localStorage.token = res.data.data.token
            this.props.history.push({
              pathname:"/Home/main"
            })
            window.localStorage.n = this.state.loname
            window.localStorage.password = this.state.lopassWord
            window.localStorage.userEmail = res.data.data.sysUbcUser.userEmail === undefined ? '' : res.data.data.sysUbcUser.userEmail
            window.localStorage.userNum = res.data.data.sysUbcUser.phoneNumber === undefined ? '' : res.data.data.sysUbcUser.phoneNumber
            window.localStorage.userCompName = res.data.data.sysUbcUser.companyName === undefined ? '' : res.data.data.sysUbcUser.companyName
            window.localStorage.userCompPlace = res.data.data.sysUbcUser.companyPlace === undefined ? '' : res.data.data.sysUbcUser.companyPlace
          }else{
            message.error(res.data.msg)
          }
        })
      }
    },200)
  }

  render() {
    return (
      <div id="login" >
        <div className="loginLogo"><img src={logo} alt="" style={{width:"130px"}}></img></div>
        <Select defaultValue="ch" style={{ width: 177,position:'absolute',right:'25px',top:'17px'}} onChange={this.handleChange}>
        <Option value="ch">中文（中华人民共和国）</Option>
        <Option value="en">英文</Option>
      </Select>
        <Row type="flex" justify="center">
          <Col span={8} className="comptantName">RWG PLATFORM</Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={7} className="loginBox">
            <Row type="flex" justify="center">
              <Col span={22}><Link to="/Register"><span className="register">注册</span></Link></Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={22}>
                <span className="loginText">用户名</span>
              </Col>
            </Row>
            <Row type="flex" justify="center" >
              <Col span={22}>
                {/*  */}
                <Input onKeyUp={this.keypress.bind(this)} placeholder="请输入用户名/邮箱" onBlur={this.loginname.bind(this)} ref="username" className={this.state.errorName === true ? 'errorName' : ''}/>
                <span className="errorInfo">
                  {this.state.username === "" ? "" : `${this.state.username}`}
                </span>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={22}>
                <span className="loginText">密码</span>
              </Col>
            </Row>
            <Row type="flex" justify="center"  style={{"marginBottom":"1.4vw"}}>
              <Col span={22}>
                <Input onKeyUp={this.keypress.bind(this)} type="password" placeholder="请输入密码" ref="password" onBlur={this.loginpassword.bind(this)}  className={this.state.errorPas === true ? 'errorPas' : ''}/>{/*  */}
                <span className="errorInfo">
                  {this.state.password === "" ? "" : `${this.state.password}`}
                </span>
              </Col>
              
            </Row>
            <Row type="flex" justify="center">
                <Col span={22} style={{"display":"flex","justifyContent":"space-between","alignItems":"center"}}>
                  <Button type="primary" size="large" block  onClick={this.login.bind(this)}>登录</Button>
                  <div className="forget">忘记密码</div>
                </Col>
            </Row>
          </Col>
        </Row>
        <Footer className="footer">
          <div>© Siemens AG 2019-2029 All Rights Reserved. </div>
          <ul>
              <li>技术支持</li>
              <li>OSS</li>
              <li>合作方信息</li>
              <li>隐私权政策</li>
              <li>使用条款</li>
              <li>数字标识码</li>
          </ul>
        </Footer>
      </div>
    );
  }
}

export default Login;
