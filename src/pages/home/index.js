import React from 'react';
import './index.css';
import {Layout, Menu , Icon, Select, Input, Modal, Row, Col, message } from 'antd';
import { Link ,Route, withRouter} from "react-router-dom"
import cookie from "../../utils/way.js" 
import main from "../main/index" //首页
import projectManage from "../projectManage/index" //项目管理
import equipmentList from "../equipmentList/index" //项目管理-设备列表
import childDevice from "../childDevice/index" //项目管理-设备列表-子设备
import superUser from "../superUser/index" //用户管理-系统管理员1
import localUser from "../localUser/index" //用户管理-地域管理员2
import userPage from "../userPage/index" //用户管理-超级用户3
import treePage from "../treePage/index" //项目管理-某一个项目
import pagetest2 from "../pagetest2/index" //普通用户-只能查看/修改自己信息 （右上角用户信息）
import tablePage from "../tablePage/index" //数据趋势
import systemManage from "../systemManage/index" //系统设置
import alarm from "../alarm/index" //报警

import headAlarm from "../../img/headAlarm.svg"
import language from "../../img/language.svg"
import logo from "../../img/logo.svg"
import headUser from "../../img/headUser.svg"

const setCookie = cookie.setcookie
const getCookie = cookie.getcookie
const { Header, Sider ,Content ,Footer} = Layout;
// 切换中英文
const Option = Select.Option;
// icon
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1131059_1p7nifq63bz.js',
});
class Home extends React.Component{
  // 初始化
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
      if(res.data.result === "SUCCESS"){
        this.setState({
          userName:res.data.data.loginName,
        })
      }else if(res.data.code === "E0000"){
        message.info(res.data.msg)
        this.props.history.push({
          pathname:"/"
        })
      }else{ 
        message.info(res.data.msg)
      }
    })
    // 页面/导航
    this.pageNow();
    if(getCookie("pageDefault")&&getCookie("pageDefault")[1] !=="1"){
      let data = getCookie("keyPath")[1].split(",")
      setTimeout(()=>{
        this.setState({
          default:data[0]
        })
      },0)
    }
    // 权限
    let root = window.localStorage.userType;
    console.log(root)
    if(root === "1"){
      this.setState(prevState => ({//超级管理员
        super:'block',
        local:'none',
        user3:'none'
      }));
    }
    if(root === "2"){
      this.setState(prevState => ({//地域管理员
        super:'none',
        local:'block',
        user3:'none',
        set:'none'
      }));
    }
    if(root === "3"){
      this.setState(prevState => ({//超级用户
        super:'none',
        local:'none',
        user3:'block',
        set:'none'
      }));
    }
    if(root === "4"){
      this.setState(prevState => ({//普通用户
        super:'none',
        local:'none',
        user3:'none',
        lis:'none',
        set:'none'
      }));
    }
  }
  // head-right-user
  menu = (
    <Menu>
      <Menu.Item key="0">个人设置</Menu.Item>
      <Menu.Item key="1">消息查看</Menu.Item>
      <Menu.Item key="3"><Link to="/">退出登录</Link></Menu.Item>
    </Menu>
  )
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
    default:"1",
    lastname:"首页",
    //权限
    isToggleOn: true,
    super: 'block',
    local: 'none',
    user3:'none',
    // 弹出框
    visible: false,
    pass1:'',
    pass2:'',
    pass3:''
  };
  // 修改密码弹出框
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.pass1();
    this.pass2();
    this.pass3();
    if(this.refs.newPwda.state.value === this.refs.newPwd.state.value){
      if( window.localStorage.password === this.refs.password.state.value){
        let param = new URLSearchParams()
        param.append('token', window.localStorage.token)
        param.append('loginName', window.localStorage.n)
        param.append('password', this.refs.password.state.value)
        param.append('newPwd', this.refs.newPwd.state.value)

        window.$axios({
        method:"POST",
        url:"/ubc/siemens/console/registered/updatePwd",
        data:param,
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
        }).then((res)=>{
          if(res.data.result === "SUCCESS"){
            this.setState({
              visible: false,
            });
            message.info('您已成功修改密码')
            setTimeout(()=>{this.props.history.push({
              pathname:"/"
            })},2000)
          }else if(res.data.code === "E0000"){
            message.info(res.data.msg)
            this.props.history.push({
              pathname:"/"
            })
          }else{
            message.info(res.data.msg)
          }
        })  
      }else{
        message.info('您输入的原密码有误，请重新输入')
      }
    }else{
      message.info('您两次输入的密码不一致，请重新输入')
    }
  }
  handleCancel = () => {
    console.log();
    this.setState({
      visible: false,
    });
  }
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  //选择菜单子项
  itemClick(item){
    setCookie("pageDefault",item.key,0)
    setCookie("keyPath",item.keyPath,0)
    this.setState({
      default:item.key
    })
  }

  //左边导航菜单和路由对应
  pageNow(){
    let data = window.location.pathname.split("/")
    switch(data[data.length-1]){
      case "main" :{
        this.setState({
          openKeys: ["1",'sub1']
        })
        break;
      }
      case "pagetest2" :{
        this.setState({
          openKeys: ["2",'sub1']
        })
        break;
      }
      case "userPage" :{
        this.setState({
          openKeys: ["6",'sub2']
        })
        break;
      }
      case "tablePage" :{
        this.setState({
          openKeys: ["5",'sub2']
        })
        break;
      }
      case "treePage" :{
        this.setState({
          openKeys: ["9",'sub4']
        })
        break;
      }
      default :{
        break;
      }
    }
  }
  pass1(){
    if(this.refs.password.state.value === undefined || this.refs.password.state.value === ""){
      this.setState({
        pass1:"旧密码不能为空",
        errorEma:true
      })
      return false
    }else{
      this.setState({
        pass1:"",
        errorEma:false
      })
      return true
    }
  }
  pass2(){
    if(this.refs.newPwda.state.value === undefined || this.refs.newPwda.state.value === ""){
      this.setState({
        pass2:"新密码不能为空",
        errorEma2:true
      })
      return false
    }else{
      this.setState({
        pass2:"",
        errorEma2:false
      })
      return true
    }
  }
  pass3(){
    if(this.refs.newPwd.state.value === undefined || this.refs.newPwd.state.value === ""){
      this.setState({
        pass3:"新密码不能为空",
        errorEma3:true
      })
      return false
    }else{
      this.setState({
        pass3:"",
        errorEma3:false
      })
      return true
    }
  }
  render() {
    return (
    <div id="home">
      <Layout>
        {/* 头部 */}
        <Header className="header">
        <img src={logo} alt="" style={{width:"9.8vw"}}></img>
        <div className="compName">RWG PLATFORM</div>
        <div className="setBox">
          {/* 报警页面入口 */}
          <Link to="/Home/alarm"><img src={headAlarm} alt="" style={{width:"1.3vw",marginRight:'20px'}}></img></Link>
          {/* 切换中英文 */}
          <img src={language} alt="" style={{width:"1.3vw",zIndex:'999'}}></img>
          <Select className="lang" defaultValue="jack" style={{ width: 60}} onChange={this.handleChange}>
            <Option value="jack">中文</Option>
            <Option value="lucy">英文</Option>
          </Select>
          {/* 用户信息页面入口/修改密码/退出登录 */}
          <img src={headUser} alt="" style={{width:"1.3vw",zIndex:'999'}}></img>
          <Select className="user" value={this.state.userName === undefined ? '--' : this.state.userName} style={{ width: 115}} onChange={this.handleChange}>
            <Option value="a"><Link className="exit" to="/Home/pagetest2" style={{color:'rgba(0,0,0,0.65)'}}>用户信息</Link></Option>
            <Option value="b" onClick={this.showModal.bind(this)}>修改密码</Option>
            <Option value="c"><Link className="exit" to="/" style={{color:'rgba(0,0,0,0.65)'}}>退出</Link></Option>
          </Select>
          <Modal
              title="修改密码"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              className="modalus"
              >
                <Row type="flex" justify="center">
                  <Col span={5} className="right">旧密码：</Col>
                  <Col span={18}><Input type="password" placeholder="请输入旧密码" ref="password" onBlur={this.pass1.bind(this)} className={this.state.errorEma === true ? 'errorEma' : ''}/>
                    <span className="error">
                      {this.state.pass1 === "" ? "" : `${this.state.pass1}`}
                    </span>
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{marginTop:'16px'}}>
                  <Col span={5} className="right">新密码：</Col>
                  <Col span={18}><Input type="password" placeholder="请输入新密码" ref="newPwda" onBlur={this.pass2.bind(this)} className={this.state.errorEma2 === true ? 'errorEma' : ''}/>
                    <span className="error">
                      {this.state.pass2 === "" ? "" : `${this.state.pass2}`}
                    </span>
                  </Col>
                </Row>
                <Row type="flex" justify="center" style={{marginTop:'16px'}}>
                  <Col span={5} className="right">新密码：</Col>
                  <Col span={18}><Input type="password" placeholder="请再输入一次新密码" ref="newPwd" onBlur={this.pass3.bind(this)} className={this.state.errorEma3 === true ? 'errorEma' : ''}/>
                    <span className="error">
                      {this.state.pass3 === "" ? "" : `${this.state.pass3}`}
                    </span>
                  </Col>
                </Row>
            </Modal>
          </div>
        </Header>

        {/* 侧边栏 */}
        <Layout>
          <Sider className="sider" style={{ background: '#001529' }}>
            <Menu
            mode="inline"
            selectedKeys={[this.state.default]}
            defaultOpenKeys={['1']}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange.bind(this)}
            onClick={this.itemClick.bind(this)}
            style={{ height: '100%', borderRight: 0 }}
            >
            <Menu.Item key="1"><Link to="/Home/main"><IconFont type="iconmain" />首页</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/Home/projectManage"><IconFont type="iconmain1" />项目管理</Link></Menu.Item>
            
            <Menu.Item key="3" style={{display: this.state.lis}}>
              {/* 超级管理员 */}
              <Link to="/Home/superUser" style={{display: this.state.super}}><IconFont type="iconmain2" />用户管理</Link>
              {/* 地域管理员 */}
              <Link to="/Home/localUser" style={{display: this.state.local}}><IconFont type="iconmain2" />用户管理</Link>
              {/* 超级用户 */}
              <Link to="/Home/userPage" style={{display: this.state.user3}}><IconFont type="iconmain2" />用户管理</Link>
            </Menu.Item>
            
            {/* <Menu.Item key="4"  style={{display: this.state.dis}}></Menu.Item> */}
            <Menu.Item key="4"><Link to="/Home/tablePage"><IconFont type="iconmain3" />数据趋势</Link></Menu.Item>
            <Menu.Item key="5" style={{display: this.state.set}}><Link to="/Home/systemManage"><IconFont type="iconmain4" />系统设置</Link></Menu.Item>
            </Menu>
          </Sider>

          {/* 内容部分 */}
          <Layout style={{ padding: '0 24px 24px' }}>
            {/* 内容页面的路由跳转 */}
            <Content style={{background: '#fff', padding: 24, marginTop: 24, minHeight: 280,}}>
              <Route exact path="/" component={main} />
              <Route path="/Home/main" component={main} />
              <Route path="/Home/projectManage" component={projectManage} />
              <Route path="/Home/equipmentList" component={equipmentList} />
              <Route path="/Home/childDevice" component={childDevice} />
              <Route path="/Home/treePage" component={treePage} />
              <Route path="/Home/userPage" component={userPage} />
              <Route path="/Home/localUser" component={localUser} />
              <Route path="/Home/superUser" component={superUser} />
              <Route path="/Home/pagetest2" component={pagetest2} />
              <Route path="/Home/tablePage" component={tablePage} />
              <Route path="/Home/systemManage" component={systemManage} />
              <Route path="/Home/alarm" component={alarm} />
            </Content>
          </Layout>
        </Layout>
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
      </Layout>
    </div>
    );
  }
}

export default withRouter(Home);
