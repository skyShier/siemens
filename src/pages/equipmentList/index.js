import React from 'react';
import './index.css'
import { Table, Button, Input, Modal, Row, Col, message, Divider } from 'antd';
import { Link } from "react-router-dom"
// search
const Search = Input.Search;
// massage
message.config({
  top: 20,
  duration: 2,
  maxCount: 1,
});
class EquipmentList extends React.Component{
  // 初始化获取列表
  componentDidMount(){
    this.setState({
      loading:true
    })
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    param.append('projectId', window.localStorage.xmid)
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/device/getByProjectId",
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
        loading:false
      });
    })
  }
  // 新增弹出框
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
    loading:false,
  }
  // 选中行
  onClickRow = (record) => {
    return {
      onClick: () => {
        window.localStorage.iotId = record.iotId
      },
    };
  }
  // 添加设备--弹出
  showModal = () => {//弹出
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {//确定
    this.setState({
      loading:true
    })
      let param = new URLSearchParams()
      param.append('token', window.localStorage.token)
      param.append('projectId', window.localStorage.xmid)
      param.append('ubcDeviceName',this.refs.ubcDeviceName.state.value)
      param.append('productKey',this.refs.productKey.state.value)
      param.append('deviceName',this.refs.deviceName.state.value)
      
      window.$axios({
        method:"POST",
        url:"/ubc/siemens/console/device/addDevice",
        data:param,
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }).then((res)=>{
        if(res.data.result === "SUCCESS"){
          message.info("您已添加成功")
          this.setState({
            visible: false,
            loading:false
          });
          this.componentDidMount()
        }else if(res.data.code === "E0000"){
          message.info(res.data.msg)
          this.props.history.push({
            pathname:"/"
          })
        }else{ 
          message.error(res.data.msg)
          this.setState({
            loading:false
          })
        }
      })
  }
  handleCancel = () => {//取消
    this.setState({
      visible: false,
    });
  }
  // table-------------------------------------------------------------------------------
  columns = [{
    title: '设备名称',
    dataIndex: 'ubcDeviceName',
    key: 'ubcDeviceName',
  }, {
    title: 'deviceName',
    dataIndex: 'deviceName',
    key: 'deviceName',
  }, {
    title: 'productKey',
    dataIndex: 'productKey',
    key: 'productKey',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (record,key) => (
      <span>
        <span style={{display:'flex',position:'relative',alignItems:'center'}}>
          {this.state.data.map((item)=>{
                if(item.key === key.key){
                  return(
                    <div className="point" key={item.key} style={{background:item.status === "ONLINE" ? "#0DAA1A" :"#9BAFBE"}}></div>
                  )
                }
                return ""
          })}
          <span style={{marginLeft:'0.5vw'}}>{record}</span>
        </span>
      </span>
    )
  }, {
    title: '最后上线时间',
    dataIndex: 'gmtOnline',
    key: 'gmtOnline',
  },{
    title: '操作',
    key: 'operation',
    render: (record) => (
      <span>
        <span style={{color:'#006486'}}>编辑</span>
        <Divider type="vertical" />
        <Link to="/Home/childDevice" style={{color:'#006486'}}>子设备</Link>
      </span>
    ),
  }]
  remove(key){
    let arr = []
    this.state.data.forEach((item)=>{
      if(key !== item.key){
        arr.push(item)
      }
    })
    this.setState({
      data:arr
    })
  }
  render() {
    const { visible, confirmLoading} = this.state;//弹出
    return (
      <div id="EquipmentList">
        <div className="link21">
          <Link to="/Home/main"><span style={{color:'#374B5A',marginRight:'5px'}}>首页</span></Link><span style={{color:'#374B5A'}}>></span>
          <Link to="/Home/projectManage"><span style={{color:'#374B5A',marginLeft:'5px'}}>项目管理</span></Link><span style={{color:'#879BAA'}}>></span>
          <span style={{color:'#879BAA',marginLeft:'5px'}}>设备列表</span>
        </div>
        <div className="userHead">
          <div className="userText">
            <Search
                placeholder="设备名称"
                onSearch={value => console.log(value)}
                style={{ width: 200,marginRight:'20px' }}
              />
          </div>
          <div>
            <Button type="primary" onClick={this.showModal.bind(this)}>添加设备</Button>
            <Modal
              title="添加设备"
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
              className="modalListeq"
            >
              <Row type="flex" justify="center" style={{marginTop:'16px'}}>
                <Col span={5} className="right">设备名称:</Col>
                <Col span={18}><Input placeholder="请输入设备名称" ref="ubcDeviceName"/></Col>
              </Row>
              <Row type="flex" justify="center" style={{marginTop:'16px'}}>
                <Col span={5} className="right">deviceName:</Col>
                <Col span={18}><Input placeholder="请输入deviceName" ref="productKey"/></Col>
              </Row>
              <Row type="flex" justify="center" style={{marginTop:'16px'}}>
                <Col span={5} className="right">productKey:</Col>
                <Col span={18}><Input placeholder="请输入productKey" ref="deviceName"/></Col>
              </Row>
              
            </Modal>
          </div>
        </div>
        {/* Tab */}
        <Table rowSelection={this.rowSelection} columns={this.columns} onRow={this.onClickRow} dataSource={this.state.data} bordered pagination={{pageSize:10}} loading={this.state.loading}/>
      </div>
    );
  }
}

export default EquipmentList;
