import React from 'react';
import './index.css'
import { Link } from "react-router-dom"

class systemManage extends React.Component{
  
  render() {
    return (
      <div id="systemManage">
        <div className="link5">
          <Link to="/Home/main"><span style={{color:'#374B5A',marginRight:'5px'}}>首页</span></Link><span style={{color:'#374B5A'}}>></span>
          <span style={{color:'#879BAA',marginLeft:'5px'}}>系统管理</span>
        </div>
        <div>暂无信息</div>
      </div>
    );
  }
}

export default systemManage;
