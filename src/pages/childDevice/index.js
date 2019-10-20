import React from 'react';
import './index.css'
import { Table, Button, Input, message, Modal } from 'antd';
import { Link } from "react-router-dom"
import setAlart from "../../img/setAlart.svg"
// search
const Search = Input.Search;
// massage
message.config({
  top: 20,
  duration: 2,
  maxCount: 1,
});
class childDevice extends React.Component{
  // 初始化获取列表
  componentDidMount(){
    this.setState({
      loading:true
    })
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    param.append('parentIotId', window.localStorage.iotId)
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/device/getByParentIotId",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      if(res.data.result === "SUCCESS"){
        this.setState({
          data:res.data.data,
          loading:false
        })
      }else if(res.data.code === "E0000"){
        message.info(res.data.msg)
        this.props.history.push({
          pathname:"/"
        })
      }
      this.setState({
        rowId: undefined,
        loading:false
      });
    })
  }
  state = {
    visible:false,
  }
  // 同步设备
  showModal = () => {
      this.setState({
        visible: true,
      });
  }
  handleOk = () => {
    this.setState({
      loading:true
    })
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    param.append('projectId', window.localStorage.xmid)
    param.append('iotId', window.localStorage.iotId)
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/device/snyChildDevice",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      if(res.data.result === "SUCCESS"){
        this.componentDidMount()
        message.success('您已成功同步设备');
      }else if(res.data.code === "E0000"){
        message.info(res.data.msg)
        this.props.history.push({
          pathname:"/"
        })
      }else{
        message.error(res.data.msg)
      }
    })
    this.setState({
      visible: false,
    }); 
  }
  // 取消
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  // table-------------------------------------------------------------------------------
  columns = [{
    title: '子设备名称',
    dataIndex: 'ubcDeviceName',
    key: 'ubcDeviceName',
    // render: text => <a href="http//:www.baidu.com">{text}</a>,
  },{
    title: '同步时间',
    dataIndex: 'gmtCreate',
    key: 'gmtCreate',
  },{
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (record,key) => (
      <span>
        <span style={{display:'flex',position:'relative',alignItems:'center'}}>
          {this.state.data.map((item)=>{
                if(item.id === key.id){
                  return(
                    <div className="point" key={item.id} style={{background:item.status === "ONLINE" ? "#0DAA1A" :"#9BAFBE"}}></div>
                  )
                }
                return ""
          })}
          <span style={{marginLeft:'0.5vw'}}>{record}</span>
        </span>
      </span>
    )
  },{
    title: '最后上线时间',
    dataIndex: 'gmtOnline',
    key: 'gmtOnline',
    render: (record) => (
      <span>{record === '' ? '--' : record}</span>
    )
  }]
  render() {
    const { confirmLoading, visible } = this.state;
    return (
      <div id="childDevice">
        <div className="link22">
          <Link to="/Home/main"><span style={{color:'#374B5A',marginRight:'5px'}}>首页</span></Link><span style={{color:'#374B5A'}}>></span>
          <Link to="/Home/projectManage"><span style={{color:'#374B5A',marginLeft:'5px'}}>项目管理</span></Link><span style={{color:'#374B5A'}}>></span>
          <Link to="/Home/equipmentList"><span style={{color:'#374B5A',marginLeft:'5px'}}>设备列表</span></Link><span style={{color:'#879BAA'}}>></span>
          <span style={{color:'#879BAA',marginLeft:'5px'}}>子设备</span>
        </div>
        <div className="userHead">
          <div className="userText">
            <Search
                placeholder="子设备名称"
                onSearch={value => console.log(value)}
                style={{ width: 200,marginRight:'20px' }}
              />
          </div>
          <div>
            <Button type="primary" onClick={this.showModal.bind(this)}>同步设备</Button>
            {/* 拷贝项目 */}
            <Modal
              title="同步设备"
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
              className="modalList"
            >
              <div>
                <img src={setAlart} alt="" style={{width:"1.3vw",zIndex:'999',marginRight:'10px'}}></img>
                需要同步设备信息吗？</div>
            </Modal>
          </div>
        </div>
        {/* Tab */}
        <Table rowSelection={this.rowSelection} columns={this.columns} dataSource={this.state.data} bordered pagination={{pageSize:8}} loading={this.state.loading}/>
      </div>
    );
  }
}

export default childDevice;
