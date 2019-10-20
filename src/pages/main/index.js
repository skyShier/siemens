import React from 'react';
import './index.css'
import { Link } from "react-router-dom"
import mainList1 from "../../img/mainList1.svg"
import mainList2 from "../../img/mainList2.svg"
import mainList3 from "../../img/mainList3.svg"
import mainList4 from "../../img/mainList4.svg"
import mainList5 from "../../img/mainList5.svg"
import mainselect from "../../img/mainselect.svg"
import map1 from "../../img/mapAll.svg"
import mapMark from "../../img/mark.png"

class main extends React.Component{
  componentDidMount(){
    // M3byIhp8Yhb5ma8o4VCka2WLh43X5m1m   key
    const { BMap } = window
    var map = new BMap.Map("allmap"); // 创建Map实例
    map.centerAndZoom(new BMap.Point(110.093, 33.136), 5); // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.NavigationControl({
      type: window.BMAP_NAVIGATION_CONTROL_ZOOM,
      anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT,
      offset: new BMap.Size(20, 35)
    })); 
    map.enableScrollWheelZoom(true);

    var pt = new BMap.Point(120.1, 29.9);
    var myIcon = new BMap.Icon(mapMark, new BMap.Size(30,57));
    var marker2 = new BMap.Marker(pt,{icon:myIcon});
    marker2.addEventListener("click",() => {
      this.props.history.push({
        pathname:"/Home/treePage"
      })
    });
    map.addOverlay(marker2);  
  }
  state={
    dis:'block',
    toggle:false,
    width:'65.6vw'
  }
  // map全屏
  mapAll(){
    this.setState({
      toggle:!this.state.toggle,
      dis:this.state.toggle ? 'block' : 'none',
      width:this.state.toggle ? '65.6vw' : '84vw',
      right:this.state.toggle ? 'calc(16.4vw + 37px)' : '30px',
    })
  }
  render() {
    return (
      <div id="myhome">
        <Link to="/Home/main"><div className="link1">首页</div></Link>
        <div className="selectIcon"><img src={mainselect}  alt=""></img></div>
        <div className="firstBox">
        {/* map */}
        <div id="allmap" style={{ width: this.state.width, height: '78.7vh'}}></div>
        <div className="mapAll" style={{ right: this.state.right}} onClick={this.mapAll.bind(this)}><img src={map1} alt="" style={{width:"17px",marginTop:'9px',marginLeft:'9px'}}></img></div>
        {/* List */}
        <div className="columnBox" style={{display:this.state.dis}}>
          <div className="box">
            <div>
              <div>项目总数</div>
              <div>124</div>
            </div>
            <img src={mainList1} alt="" style={{width:"40px"}}></img>
          </div>
          <div className="box">
            <div>
              <div>连接控制器数量</div>
              <div>500</div>
            </div>
            <img src={mainList2} alt="" style={{width:"40px"}}></img>
          </div>
          <div className="box">
            <div>
              <div>在线设备数量</div>
              <div>200</div>
            </div>
            <img src={mainList3} alt="" style={{width:"40px"}}></img>
          </div>
          <div className="box">
            <div>
              <div>报警设备数量</div>
              <div>5</div>
            </div>
            <img src={mainList4} alt="" style={{width:"40px"}}></img>
          </div>
          <div className="box">
            <div>
              <div>网关数量</div>
              <div>5</div>
            </div>
            <img src={mainList5} alt="" style={{width:"40px"}}></img>
          </div>
          <div className="box">
            <div>
              <div>数据点</div>
              <div>5</div>
            </div>
            <img src={mainList5} alt="" style={{width:"40px"}}></img>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default main;
