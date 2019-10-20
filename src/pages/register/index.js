import React from 'react';
import './index.css'
import { Button, Row, Col, Input, Layout , message} from 'antd'
import { Link } from "react-router-dom"
const {Footer} = Layout;
class Register extends React.Component{
  
  state={
    Email:"",
    username:"",
    companyName:"",
    companyAddress:"",
    phone:"",
    password:"",
    againPassword:"",
    errorEma:false,
    errorName:false,
    errorComp:false,
    errorComd:false,
    errorPho:false,
    errorPas:false,
    errorPasa:false
  }

  Eamil(){
    //是否是html代码片段
    let reg = /<|>/
    //邮箱校验
    let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if(this.refs.Email.state.value === undefined || this.refs.Email.state.value === ""){
      this.setState({
        Email:"邮箱不能为空",
        errorEma:true
      })
      return
    }else if(this.refs.Email.state.value.slice(0,1) === " "){
      this.setState({
        Email:"邮箱开头不能为空",
        errorEma:true
      })
      return
    }else if(reg.test(this.refs.Email.state.value)){
      this.setState({
        Email:"无效值",
        errorEma:true
      })
      return
    }else if(!emailReg.test(this.refs.Email.state.value)){
      this.setState({
        Email:"邮箱地址不合法",
        errorEma:true
      })
      return
    }else{
      this.setState({
        Email:"",
        errorEma:false
      })
      return
    }
  }
  username(){
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
          errorName:true
        })
        return
      }else{
        this.setState({
          username:"",
          errorName:false
        })
        return
      }
  }
  companyName(){
      //是否是html代码片段
      let reg = /<|>/
      //公司名称校验
      if(this.refs.companyName.state.value === undefined || this.refs.companyName.state.value === "" ||this.refs.companyName.state.value.slice(0,1) === " "){
        this.setState({
          companyName:"公司名称必填",
          errorComp:true
        })
        return
      }else if(reg.test(this.refs.companyName.state.value)){
        this.setState({
          companyName:"无效值",
          errorComp:true
        })
        return
      }else if(this.refs.companyName.state.value.length<1 || this.refs.companyName.state.value.length >255){
        this.setState({
          companyName:"公司名称长度必须在1-255个之间",
          errorComp:true
        })
        return
      }else{
        this.setState({
          companyName:"",
          errorComp:false
        })
        return
      }
  }
  companyAddress(){
    //是否是html代码片段
    let reg = /<|>/
    //公司地址校验
    if(this.refs.companyAddress.state.value === undefined || this.refs.companyAddress.state.value === "" ||this.refs.companyAddress.state.value.slice(0,1) === " "){
      this.setState({
        companyAddress:"",
        errorComd:false
      })
      return
    }else if(reg.test(this.refs.companyAddress.state.value)){
      this.setState({
        companyAddress:"无效值",
        errorComd:true
      })
      return
    }else if(this.refs.companyAddress.state.value.length > 200){
      this.setState({
        companyAddress:"字符长度限制在200个之内",
        errorComd:true
      })
      return
    }else{
      this.setState({
        companyAddress:"",
        errorComd:false
      })
      return
    }
  }
  phone(){
    //是否是html代码片段
    let reg = /<|>/
    //号码校验
    let phoneReg = /^1(3|4|5|7|8)\d{9}$/
    //手机号码校验
    if(this.refs.phone.state.value === undefined || this.refs.phone.state.value === "" ||this.refs.phone.state.value.slice(0,1) === " "){
      this.setState({
        phone:"",
        errorPho:false
      })
      return
    }else if(reg.test(this.refs.phone.state.value)){
      this.setState({
        phone:"无效值",
        errorPho:true
      })
      return
    }else if(!phoneReg.test(this.refs.phone.state.value) || this.refs.phone.state.value.length !== 11){
      this.setState({
        phone:"手机号码不合法",
        errorPho:true
      })
      return
    }else{
      this.setState({
        phone:"",
        errorPho:false
      })
      return
    }
  }
  password(){
    //空格校验
    let spaceReg = / /
    //密码校验
    if(this.refs.password.state.value === undefined || this.refs.password.state.value === "" || this.refs.password.state.value.slice(0,1) === " "){
      this.setState({
        password:"密码必填",
        errorPas:true
      })
      return
    }else if(spaceReg.test(this.refs.password.state.value)){
      this.setState({
        password:"密码不能包含空格",
        errorPas:true
      })
      return
    }else if(this.refs.password.state.value.length<8 || this.refs.password.state.value.length>25){
      this.setState({
        password:"长度必须必须在8-25个之间",
        errorPas:true
      })
      return
    }else{
      this.setState({
        password:"",
        errorPas:false
      })
      return
    }
  }
  againPassword(){
    //空格校验
    let spaceReg = / /
    //确认密码校验
    if(this.refs.againPassword.state.value === undefined || this.refs.againPassword.state.value === "" || this.refs.againPassword.state.value.slice(0,1) === " "){
      this.setState({
        againPassword:"确认密码必填",
        errorPasa:true
      })
      return
    }else if(spaceReg.test(this.refs.againPassword.state.value)){
      this.setState({
        againPassword:"确认密码不能包含空格",
        errorPasa:true
      })
      return
    }else if(this.refs.againPassword.state.value.length<8 || this.refs.againPassword.state.value.length>25){
      this.setState({
        againPassword:"长度必须必须在8-25个之间",
        errorPasa:true
      })
      return
    }else if(this.refs.password.state.value !== this.refs.againPassword.state.value){
      this.setState({
        againPassword:"两次密码不一致",
        errorPasa:true
      })
      return
    }else{
      this.setState({
        againPassword:"",
        errorPasa:false
      })
      return
    }
    
  }
  register(){

    this.Eamil()
    this.username()
    this.companyName()
    this.companyAddress()
    this.phone()
    this.password()
    this.againPassword()

    setTimeout(() => {
      if(!this.state.Email && !this.state.username && !this.state.companyName && !this.state.companyAddress && !this.state.phone && !this.state.password && !this.state.againPassword ){
        let param = new URLSearchParams()
        param.append('userEmail', this.refs.Email.state.value)
        param.append('loginName', this.refs.username.state.value)
        param.append('companyName',this.refs.companyName.state.value)
        param.append('phoneNumber', this.refs.phone.state.value === undefined ? '' : this.refs.phone.state.value)
        param.append('companyPlace', this.refs.companyAddress.state.value === undefined ? '' : this.refs.companyAddress.state.value)
        param.append('password', this.refs.password.state.value)
        window.$axios({
          method:"POST",
          url:"/ubc/siemens/console/registered/regist",
          data:param,
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
        }).then((res)=>{
          if(res.data.msg === ""){
            message.success('您已注册成功',1)
            setTimeout(()=>{this.props.history.push({
              pathname:"/"
            })},2000)
          }else{
            message.error(res.data.msg)
          }
        })
      }
    }, 200);
  }

  render() {
    return (
      <div id="reg">
        <Row type="flex" justify="center">
          <Col span={7} className="regBox">
            <Row type="flex" justify="center">
              <Col span={22}><span className="regText" >邮箱地址</span></Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={22}>
                <Input placeholder="必填" ref="Email" onBlur={this.Eamil.bind(this)} className={this.state.errorEma === true ? 'errorEma' : ''}/>
                <span className="errorInfo">
                    {this.state.Email === "" ? "" : `${this.state.Email}`}
                  </span>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={22}><span className="regText">用户名</span></Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={22}>
                <Input placeholder="必填"  ref="username" onBlur={this.username.bind(this)} className={this.state.errorName === true ? 'errorName' : ''}/>
                <span className="errorInfo">
                  {this.state.username === "" ? "" : `${this.state.username}`}
                </span>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={22}><span className="regText">公司名称</span></Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={22}>
                <Input placeholder="必填" ref="companyName" onBlur={this.companyName.bind(this)} className={this.state.errorComp === true ? 'errorComp' : ''}/>
                <span className="errorInfo">
                  {this.state.companyName === "" ? "" : `${this.state.companyName}`}
                </span>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={22}><span className="regText">公司地址</span></Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={22}>
                <Input placeholder="选填" ref="companyAddress" onBlur={this.companyAddress.bind(this)} className={this.state.errorComd === true ? 'errorComd' : ''}/>
                <span className="errorInfo">
                  {this.state.companyAddress === "" ? "" : `${this.state.companyAddress}`}
                </span>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={22}><span className="regText">手机号码</span></Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={22}>
                <Input placeholder="选填" ref="phone" onBlur={this.phone.bind(this)} className={this.state.errorPho === true ? 'errorPho' : ''}/>
                <span className="errorInfo">
                  {this.state.phone === "" ? "" : `${this.state.phone}`}
                </span>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={22}><span className="regText">密码</span></Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={22}>
                <Input type="password" placeholder="必填" ref="password" onBlur={this.password.bind(this)} className={this.state.errorPas === true ? 'errorPas' : ''}/>
                <span className="errorInfo">
                  {this.state.password === "" ? "" : `${this.state.password}`}
                </span>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={22}>
                <span className="regText">确认密码
                  
                </span>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={22}>
                <Input type="password" placeholder="必填" ref="againPassword" onBlur={this.againPassword.bind(this)} className={this.state.errorPasa === true ? 'errorPasa' : ''}/>
                <span className="errorInfo">
                  {this.state.againPassword === "" ? "" : `${this.state.againPassword}`}
                </span>
              </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col span={22} >
                  <Button type="primary" size="large" block  onClick={this.register.bind(this)}>注册</Button>
                  <Link className="reg" to="/"><div className="backLogin">前往登录页</div></Link>
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

export default Register;
