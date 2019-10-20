import React from 'react';
import './index.css'
import { Tree, Row, Col, Table, Radio, message } from 'antd';
import { Link } from "react-router-dom"
const { TreeNode } = Tree;

class TreePage extends React.Component{
  componentDidMount(){
    this.setState({
      loading:true
    })
    // 获取初始树
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    // param.append('projectId', window.localStorage.xmid)
    param.append('projectId', 66)
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/device/queryAllByProjectId",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      if(res.data.result === "SUCCESS"){
        console.log(res)
        // console.log(res.data.data.proDeviceList.childList)
        const childrenAll = res.data.data.proDeviceList
        for(let i in childrenAll){
          childrenAll[i].key = '0-' + i
          childrenAll[i].title = childrenAll[i].deviceName
          let childrenAllt = res.data.data.proDeviceList[i].childList
          for(let i in childrenAllt){
            childrenAllt[i].key = '0-0-' + i
            childrenAllt[i].title = childrenAllt[i].deviceName
            childrenAllt[i].iotid = childrenAllt[i].iotId
            childrenAllt[i].children = childrenAllt[i].childList
          }
          console.log(childrenAllt[0].iotid)
          window.localStorage.treeFirstId = childrenAllt[0].iotid
          childrenAll[i].children = childrenAll[i].childList
        }
        
        // console.log(childrenAll)
        this.setState({
          treeData:[{
            title:res.data.data.projectName,
            key:'1',
            children:childrenAll
          }],
          expandedKeys: ['1','0-0','0-0-0'],
          autoExpandParent: true,//是否自动展开父节点
          selectedKeys: ['0-0-0'],
        })
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

    // 获得初始列表（数据点）
    let paramt = new URLSearchParams()
    paramt.append('token', window.localStorage.token)
    paramt.append('iotId', window.localStorage.treeFirstId)
    // paramt.append('iotId', 'tBBT9TR5XIfFlNHMRM8c000100')
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/device/getDevicePropertyStatus",
      data:paramt,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      // console.log(this.state.data)
      if(res.data.result === "SUCCESS"){
        console.log(res)
        this.setState({
          data:res.data.data.List.PropertyStatusInfo,
          loading:false
        })

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
  state = {
    expandedKeys: ['1','0-0','0-0-0'],//自动展开哪些父节点
    autoExpandParent: true,//是否自动展开父节点
    checkedKeys: ['0-0-0'],
    selectedKeys: ['0-0-0'],
    checked:false,
    treeData:[],
  }

  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info,selectedKeys);
    // console.log('222222222222', info.selectedNodes[0].props.iotid);
    this.setState({ selectedKeys,});
    // let aaa = info.selectedNodes[0].props.iotid
    // console.log(this.state.treeSelectId,aaa)
    let oldId = ''
    if(info.selected === false){
      oldId = window.localStorage.treeFirstId
    }else{
      oldId = info.selectedNodes[0].props.iotid
      window.localStorage.treeFirstId = info.selectedNodes[0].props.iotid
    }
    // 获得初始列表（数据点）
    let paramt = new URLSearchParams()
    paramt.append('token', window.localStorage.token)
    // paramt.append('iotId', info.selectedNodes[0].props.iotid)
    paramt.append('iotId', oldId)
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/device/getDevicePropertyStatus",
      data:paramt,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      // console.log(this.state.data)
      if(res.data.result === "SUCCESS"){
        console.log(res)
        this.setState({
          data:res.data.data.List.PropertyStatusInfo
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

  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  })
  // radio
  aaa = () => {
    console.log(1)
    this.setState({
      checked: !this.state.checked,
    });
  }
  // table-------------------------------------------------------------------------------
  columns = [{
    title: '数据点名称',
    dataIndex: 'Name',
    key: 'Name',
    // render: text => <a href="http//:www.baidu.com">{text}</a>,
  }, {
    title: '数据类型',
    dataIndex: 'DataType',
    key: 'DataType',
  }, 
  {
    title: '数值',
    dataIndex: 'Value',
    key: 'Value',
  }, 
  {
    title: '单位',
    dataIndex: 'Unit',
    key: 'Unit',
  }, 
  // {
  //   title: '范围',
  //   dataIndex: 'scope',
  //   key: 'scope',
  // }, 
  // {
  //   title: '步长',
  //   dataIndex: 'stepLength',
  //   key: 'stepLength',
  // }, 
  {
    title: '数据状态',
    dataIndex: 'state',
    key: 'state',
    render: (record,key) => (
      <span>
        <span style={{display:'flex',position:'relative',alignItems:'center'}}>
          {/* {this.state.data.map((item)=>{
                if(item.key === key.key){
                  return(
                    <div className="point" key={item.key} style={{background:item.state === "正常" ? "#0DAA1A" :"#D92828"}}></div>
                  )
                }
                return ""
          })}
          <span style={{marginLeft:'0.5vw'}}>{record}</span> */}
          <span style={{marginLeft:'0.5vw'}}>正常</span>
        </span>
      </span>
    )
  },
  //  {
  //   title: '枚举设置',
  //   dataIndex: 'enumeration',
  //   key: 'enumeration',
  //   render:(record) => (
  //     <span>
  //       <span>{record.trim().split(/\s+/)[0]}</span><br></br>
  //       <span>{record.trim().split(/\s+/)[1]}</span>
  //     </span>
  //   )
  // }, 
  {
    title: '读写属性',
    dataIndex: 'ReadWrite',
    key: 'ReadWrite',
    render: (record,key) => (
      <span>只读</span>
    )
  },{
    title: '存储',
    key: 'storage',
    render: (record,key) => (
      <span>
        {/* {console.log(key)}
        {console.log(record.key)} */}
        {/* <Radio checked={this.state.checked} onClick={this.aaa}></Radio> */}
        <Radio></Radio>
      </span>
    ),
  }]
  render() {
    return (
      <div id="TreePage">
        <div className="link23">
          <Link to="/Home/main"><span style={{color:'#374B5A',marginRight:'5px'}}>首页</span></Link><span style={{color:'#374B5A'}}>></span>
          <Link to="/Home/projectManage"><span style={{color:'#374B5A',marginLeft:'5px'}}>项目管理</span></Link><span style={{color:'#879BAA'}}>></span>
          <span style={{color:'#879BAA',marginLeft:'5px'}}>项目</span>
        </div>
        <div style={{display:'flex'}}>
          <Tree
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(this.state.treeData)}
          </Tree>
          <div className="contextBox">
            <div className="conUp">
              <Row>
                <Col span={9}>控制器名称：<span>一区通风 RWG1</span></Col>
                <Col span={9}>Modbus地址：<span>3</span></Col>
                {/* <Col span={6}>程序文件：--</Col> */}
                <Col span={6}>日期：<span>--</span></Col>
              </Row>
              <Row>
                <Col span={9}>所属网关IP地址：<span>192.168.1.1</span></Col>
                {/* <Col span={9}>产品Key：<span style={{color:"#D92828"}}>FAU1</span></Col> */}
                <Col span={9}>应用程序ID：<span>--</span></Col>
                <Col span={6}>IP地址：<span>--</span></Col>
              </Row>
              {/* <Row>
                <Col span={9}>IP地址：-- Copy</Col>                
              </Row> */}
            </div>
            {/* Tab */}
            <Table rowSelection={this.rowSelection} columns={this.columns} dataSource={this.state.data} bordered pagination={{pageSize:8}} />{/* loading={this.state.loading} */}
          </div>
          </div>
      </div>
    );
  }
}

export default TreePage;
