import React from 'react';
import './index.css'
import { Link } from "react-router-dom"
import { Table, Button, Input, Modal, Row, Col, Drawer, DatePicker, Radio, message, Icon, Form } from 'antd';

import moment from 'moment';
import setAlart from "../../img/setAlart.svg"
import search from "../../img/search.svg"
import del from "../../img/delete.svg"
// search
// radio
const RadioGroup = Radio.Group;
const plainOptions = ['在保', '过保']
const plainOptions2 = ['正常', '故障']
// massage
message.config({
  top: 20,
  duration: 2,
  maxCount: 1,
});

class ChangeDrawer extends React.Component {
  state = { 
    visible2: false,
    erojd:'',//经度
    erojds:false,
    erowd:'',//纬度
    erowds:false,
    eroProName:'',//项目名称
    eroProNames:false,
    eroCity:'',//城市
    eroCitys:false,
    eroUsr:'',//项目管理员
    eroUsrs:false,

  };
  handleOk() {

    this.projectName()
    this.eroCity()
    this.eroUsr()
    this.longitude()
    this.latitude()
    if(this.projectName() && this.eroCity() && this.eroUsr() && this.longitude() && this.latitude()){
      this.props.form.validateFields((err, values) => {
        if (!err && this.props.successbj) {
          this.props.successbj(values,this.state.nowTimebj)
          this.props.form.resetFields()
          this.onClose()
        }
      })
    }else{
      
    }
    
  }
  showDrawer = () => {
    if(window.localStorage.record === ''){
      message.error('请单击选中列表一行');
    }else{
      this.setState({
        visible2: true,
      });
    }
  };

  onClose = () => {
    this.setState({
      visible2: false,
      erojd:'',//经度
      erojds:false,
      erowd:'',//纬度
      erowds:false,
      eroProName:'',//项目名称
      eroProNames:false,
      eroCity:'',//城市
      eroCitys:false,
      eroUsr:'',//项目管理员
      eroUsrs:false,
    });
    console.log(window.localStorage.bja)
    window.localStorage.record = ''
    window.localStorage.bja = ''
    window.localStorage.bjb = ''
    window.localStorage.bjc = ''
    window.localStorage.bjd = ''
    window.localStorage.bje = ''
    window.localStorage.bjf = ''
    window.localStorage.bjg = ''
    window.localStorage.bjh = ''
    window.localStorage.bjj = ''
    window.localStorage.bjw = ''
  };

   // radio
   onChange3 = (e) => {
    console.log('radio1 checked', e.target.value);
    if(e.target.value === '在保'){
      this.setState({
        projectStatusbj: '0',
      });
    }
    if(e.target.value === '过保'){
      this.setState({
        projectStatusbj: '1',
      });
    }
    this.setState({
      value1: e.target.value,
    });
  }
  onChange4 = (e) => {
    console.log('radio checked', e.target.value);
    if(e.target.value === '正常'){
      this.setState({
        runStatusbj: '0',
      });
    }
    if(e.target.value === '故障'){
      this.setState({
        runStatusbj: '1',
      });
    }
    this.setState({
      value: e.target.value,
    });
  }
  // 编辑项目时间--date
  onChangeDate = (date, dateString)  =>  {
    console.log(date, dateString,date._d);
    this.setState({
      nowTimebj:dateString
    })
  }
  // 校验
  projectName(){
    //项目名
    if(this.props.form.getFieldValue('projectNamebj') === undefined || this.props.form.getFieldValue('projectNamebj') === "" || this.props.form.getFieldValue('projectNamebj').slice(0,1) === " "){
      this.setState({
        eroProName:"项目名称必填",
        eroProNames:true,
      })
      return false
    }else{
      this.setState({
        eroProName:"",
        eroProNames:false,
      })
      return true
    }
  }
  eroCity(){
    //城市
    if(this.props.form.getFieldValue('citybj') === undefined || this.props.form.getFieldValue('citybj') === "" || this.props.form.getFieldValue('citybj').slice(0,1) === " "){
      this.setState({
        eroCity:"城市必填",
        eroCitys:true,
      })
      return false
    }else{
      this.setState({
        eroCity:"",
        eroCitys:false,
      })
      return true
    }
  }
  eroUsr(){
    //项目管理员
    if(this.props.form.getFieldValue('userNamebj') === undefined || this.props.form.getFieldValue('userNamebj') === "" || this.props.form.getFieldValue('userNamebj').slice(0,1) === " "){
      this.setState({
        eroUsr:"项目管理员必填",
        eroUsrs:true,
      })
      return false
    }else{
      this.setState({
        eroUsr:"",
        eroUsrs:false,
      })
      return true
    }
  }
  // 经度
  longitude(){
    let longitude = /^-?(?:(?:180(?:\.0{1,3})?)|(?:(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d{1,3})?))$/
    //经度
    if(this.props.form.getFieldValue('longitudebj') === undefined || this.props.form.getFieldValue('longitudebj') === "" || this.props.form.getFieldValue('longitudebj').slice(0,1) === " "){
      this.setState({
        erojd:"经度必填",
        erojds:true,
      })
      return false
    }else if(!longitude.test(this.props.form.getFieldValue('longitudebj'))){
      this.setState({
        erojd:"-180到180之间",
        erojds:true,
      })
      return false
    }else{
      this.setState({
        erojd:"",
        erojds:false,
      })
      return true
    }
  }
  // 纬度
  latitude(){
    let latitude = /^-?(?:90(?:\.0{1,3})?|(?:[1-8]?\d(?:\.\d{1,3})?))$/
    //纬度
    if(this.props.form.getFieldValue('latitudebj') === undefined || this.props.form.getFieldValue('latitudebj') === "" || this.props.form.getFieldValue('latitudebj').slice(0,1) === " "){
      this.setState({
        erowd:"经度必填",
        erowds:true,
      })
      return false
    }else if(!latitude.test(this.props.form.getFieldValue('latitudebj'))){
      this.setState({
        erowd:"-90到90之间",
        erowds:true,
      })
      return false
    }else{
      this.setState({
        erowd:"",
        erowds:false,
      })
      return true
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div id="bj">
        <Button onClick={this.showDrawer}>编辑项目</Button>
        <Drawer
          title="编辑项目"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible2}
          width='37.2vw'
          style={{lineHeight:'25px'}}
          className="drawerStyle"
        >
          <Form>
            <Form.Item>
              <Row type="flex" justify="center"  style={{marginBottom:'16px'}}>
                <Col span={6} className="dright" style={{lineHeight:'32px'}}>项目名称:</Col>
                <Col span={17}>{
                  getFieldDecorator('projectNamebj',{
                    initialValue: window.localStorage.bja,
                    rules:[]
                    })(
                      <Input placeholder='请输入项目名称' onBlur={this.projectName.bind(this)} className={this.state.eroProNames === true ? 'eroProNames' : ''}/>
                    )
                  } <span className="errorInfo">
                      {this.state.eroProName === undefined ? "" : `${this.state.eroProName}`}
                    </span>
                </Col>
              </Row>
              <Row type="flex" justify="center"  style={{marginBottom:'16px'}}>
                <Col span={6} className="dright">城市:</Col>
                <Col span={17}>
                {
                  getFieldDecorator('citybj',{
                    initialValue: window.localStorage.bjb,
                    rules:[]
                    })(
                      <Input placeholder='请输入所在城市' onBlur={this.eroCity.bind(this)} className={this.state.eroCitys === true ? 'eroCitys' : ''}/>
                    )
                } <span className="errorInfo">
                    {this.state.eroCity === undefined ? "" : `${this.state.eroCity}`}
                  </span>
                </Col>
              </Row>
              <div className='drawerBox'>
                <Col span={6} className="dright">竣工时间:</Col>
                <Col span={17}><DatePicker onChange={this.onChangeDate} style={{width:'100%'}} defaultValue={moment(window.localStorage.bjc)}/></Col>
              </div>
              <div className='drawerBox'>
                <Col span={6} className="dright">项目管理员:</Col>
                <Col span={17}>
                {
                  getFieldDecorator('userNamebj',{
                    initialValue: window.localStorage.bjd,
                    rules:[]
                    })(
                      <Input placeholder='请输入项目管理员' onBlur={this.eroUsr.bind(this)} className={this.state.eroUsrs === true ? 'eroUsrs' : ''}/>
                    )
                } <span className="errorInfo">
                    {this.state.eroUsr === undefined ? "" : `${this.state.eroUsr}`}
                  </span>
                </Col>
              </div>
              <div className='drawerBox'>
                <Col span={6} className="dright">经度:</Col>
                <Col span={17}>{
                  getFieldDecorator('longitudebj',{
                    initialValue: window.localStorage.bjj,
                    rules:[]
                    })(
                      <Input placeholder='请输入经度' onBlur={this.longitude.bind(this)} className={this.state.erojds === true ? 'erojds' : ''}/>
                    )
                }
                <span className="errorInfo">
                  {this.state.erojd === undefined ? "" : `${this.state.erojd}`}
                </span></Col>
              </div>
              <div className='drawerBox'>
                <Col span={6} className="dright">纬度:</Col>
                <Col span={17}>{
                  getFieldDecorator('latitudebj',{
                    initialValue: window.localStorage.bjw,
                    rules:[]
                    })(
                      <Input placeholder='请输入纬度' onBlur={this.latitude.bind(this)} className={this.state.erowds === true ? 'erowds' : ''}/>
                    )
                  } <span className="errorInfo">
                      {this.state.erowd === undefined ? "" : `${this.state.erowd}`}
                    </span>
                </Col>
              </div>
              <div className='drawerBox'>
                <Col span={6} className="dright">项目状态:</Col>
                <Col span={17}>{
                  getFieldDecorator('zt',{
                    initialValue: window.localStorage.bje === '0' ? '过保' : '在保',
                    rules:[]
                    })(
                      <RadioGroup options={plainOptions} onChange={this.onChange3}/>
                    )
                }</Col>
              </div>
              <div className='drawerBox'>
                <Col span={6} className="dright">运行状态:</Col>
                <Col span={17}>{
                  getFieldDecorator('yxzt',{
                    initialValue: window.localStorage.bjf === '0' ? '故障' : '正常',
                    rules:[]
                    })(
                      <RadioGroup options={plainOptions2} onChange={this.onChange4}/>
                    )
                }</Col>
              </div>
              <div className='drawerBox'>
                <Col span={6} className="dright">工单跟踪:</Col>
                <Col span={17}>{
                  getFieldDecorator('workOrderbj',{
                    initialValue: window.localStorage.bjg,
                    rules:[]
                    })(
                      <Input placeholder='请输入工单跟踪'/>
                    )
                }</Col>
              </div>
              <div className='drawerBox'>
                <Col span={6} className="dright">项目描述:</Col>
                <Col span={17}>{
                  getFieldDecorator('projectDepictbj',{
                    initialValue: window.localStorage.bjh,
                    rules:[]
                    })(
                      <Input placeholder='请输入项目描述'/>
                    )
                }</Col>
              </div>
              <div style={{display:'flex',justifyContent:'flex-end',marginTop:'16px'}}>
                <Button onClick={this.onClose}>取消</Button>
                <Button onClick={this.handleOk.bind(this)} type="primary" style={{marginLeft:'6px'}}>确定</Button>
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    );
  }
}
ChangeDrawer = Form.create()(ChangeDrawer)



class Project extends React.Component{
  state = {
    visible1: false ,//新增
    visible2:false,//编辑
    visible3: false,//分享
    visible4: false,//资产
    visible5: false,//拷贝
    visible6: false,//拷贝-2
    searchText: '',// table-search
    visible7:false,//删除
    loading:false,//加载
    eroProName:'',
    eroProNames:false,
    eroCity:'',
    eroCitys:false,
    eroDate:false,
    eroUsrs:false,
    eroshare:false,
    share:'',
    // radio
    value:'正常',
    value1:'在保',
    // radio
    valuezb:'0',
    valuezc:'0'
  };
  constructor (props) {
    super(props)
    this.state = {
      data:[],
      ChangeDrawer: false,
      showVirtualDeal: false,
      tradeId: 0,
      record: null
    }
  }
  // 初始化获取列表
  componentDidMount(){
    this.setState({
      loading:true,
    })
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/project/getListProject",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      if(res.data.result === "SUCCESS"){
        console.log(res)
        this.setState({
          data:res.data.data,
          loading:false,
        })
      }else if(res.data.code === "E0000"){
        message.info(res.data.msg)
        this.setState({
          loading:false,
        })
        this.props.history.push({
          pathname:"/"
        })
      }else{
        message.info(res.data.msg)
        this.setState({
          loading:false,
        })
      }
      this.setState({
        rowId: undefined,
      });
    })
  }
  // 选中行
  onClickRow = (record) => {
    return {
      onClick: () => {
        console.log(record)
        this.setState({
          rowId: record.id,
        });
        window.localStorage.record = record
        window.localStorage.xmid = record.id
        window.localStorage.bja = record.projectName
        window.localStorage.bjb = record.city
        window.localStorage.bjc = record.strCompletionTime
        window.localStorage.bjd = record.userName
        window.localStorage.bje = record.runStatus
        window.localStorage.bjf = record.projectStatus
        window.localStorage.bjg = record.workOrder
        window.localStorage.bjh = record.projectDepict
        window.localStorage.bjj = record.longitude
        window.localStorage.bjw = record.latitude
      },
    };
  }
  // 新增项目
  showDrawer = () => {
    this.setState({
      visible1: true,
      value1:'在保',
      value:'正常'
    });
  };
  onClose = () => {
    this.setState({
      visible1: false,
      eroProName:'',//项目名称
      eroProNames:false,
      eroCity:'',//城市
      eroCitys:false,
      eroUsr:'',//项目管理员
      eroUsrs:false,
      erojd:'',//经度
      erojds:'',
      erowd:'',//纬度
      erowds:false,
    });
  };
  // 新增项目时间--date
  onChange = (date, dateString)  =>  {
    this.setState({
      nowTime:dateString
    })
  }
  success = () => {

    this.projectName()
    this.eroCity()

    this.eroUsr()
    this.longitude()
    this.latitude()

    if(this.projectName() && this.eroCity() && this.eroUsr() && this.longitude() && this.latitude()){
      let param = new URLSearchParams()
      param.append('token', window.localStorage.token)
      param.append('projectName', this.refs.projectName.state.value)
      param.append('city', this.refs.city.state.value)
      param.append('completionTime', this.state.nowTime)
      param.append('userName', this.refs.userName.state.value)
      param.append('longitude', this.refs.longitude.state.value)
      param.append('latitude', this.refs.latitude.state.value)
      param.append('projectStatus', this.state.projectStatus === undefined ? '0' : this.state.projectStatus)
      param.append('runStatus', this.state.runStatus === undefined ? '0' : this.state.runStatus)
      param.append('workOrder', this.refs.workOrder.state.value === undefined ? '--' : this.refs.workOrder.state.value)
      param.append('projectDepict', this.refs.projectDepict.state.value === undefined ? '--' : this.refs.projectDepict.state.value)
      window.$axios({
        method:"POST",
        url:"/ubc/siemens/console/project/addProject",
        data:param,
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }).then((res)=>{
        if(res.data.result === "SUCCESS"){
          message.success('您已成功新增项目');
          this.setState({
            visible1: false,
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
            visible1: true,
          });
        }
      })
    }
  };
  
  setRowClassName = (record) => {
    return record.id === this.state.rowId ? 'clickRowStyl' : '';
  }
  // radio
  onChange1 = (e) => {
    if(e.target.value === '在保'){
      this.setState({
        projectStatus: '0',
        value1: e.target.value,
      });
    }
    if(e.target.value === '过保'){
      this.setState({
        projectStatus: '1',
        value1: e.target.value,
      });
    }
  }
  onChange2 = (e) => {
    if(e.target.value === '正常'){
      this.setState({
        runStatus: '0',
      });
    }
    if(e.target.value === '故障'){
      this.setState({
        runStatus: '1',
      });
    }
    this.setState({
      value: e.target.value,

    });
  }
   // 编辑项目
   successbj = (valuesbj,timebj) => {
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    param.append('id', window.localStorage.xmid)
    param.append('projectName', valuesbj.projectNamebj)
    param.append('city', valuesbj.citybj)
    param.append('strCompletionTime', timebj === undefined ? window.localStorage.bjc : timebj)
    param.append('userName', valuesbj.userNamebj)
    param.append('longitude', valuesbj.longitudebj)
    param.append('latitude', valuesbj.latitudebj)
    param.append('projectStatus', valuesbj.zt === '在保' ? '0' : '1')
    param.append('runStatus', valuesbj.yxzt === '正常' ? '0' : '1')
    param.append('workOrder', valuesbj.workOrderbj === undefined ? '--' : valuesbj.workOrderbj)
    param.append('projectDepict', valuesbj.projectDepictbj === undefined ? '--' : valuesbj.projectDepictbj)
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/project/updateProject",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      if(res.data.result === "SUCCESS"){
        message.success('您已成功编辑项目');
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
    this.onClose()
  };
  // 新增弹出框--分享
  showModal = () => {
    if(this.state.rowId === undefined){
      message.error('请单击选中列表一行');
    }else{
      this.setState({
        visible3: true,
      });
    }
  }
  handleOk = () => {

    this.eroshare()
    if(this.refs.toShareUser.state.value === '' || this.refs.toShareUser.state.value === undefined){
      this.setState({
        visible3: true,
      }); 
    }else{
      let param = new URLSearchParams()
      param.append('token', window.localStorage.token)
      param.append('projectId', this.state.rowId)
      param.append('toShareUser',this.refs.toShareUser.state.value)
      window.$axios({
        method:"POST",
        url:"/ubc/siemens/console/project/shareProject",
        data:param,
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }).then((res)=>{
        if(res.data.result === "SUCCESS"){
          message.success('您已成功分享项目');
          this.setState({
            visible3: false,
          }); 
        }else if(res.data.code === "E0000"){
          message.info(res.data.msg)
          this.props.history.push({
            pathname:"/"
          })
        }else{
          message.error(res.data.msg)
          this.setState({
            visible3: true,
          }); 
        }
      })
    }
  }
  // 新增弹出框--资产
  showModalxq = () => {
    this.setState({
      visible4: true,
    });
  }
  handleOkxq = () => {
    this.setState({
      visible4: false,
    }); 
    message.success('您已成功分享项目');
  }
  // 删除
  showModal6 = () => {
    if(this.state.rowId === undefined){
      message.error('请单击选中列表一行');
      this.setState({
        visible7: false,
      }); 
    }else{
      this.setState({
        visible7: true,
      });
    }
  }
  handleOk7 = () => {
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    param.append('id', this.state.rowId)
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/project/deleteProject",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      if(res.data.result === "SUCCESS"){
        this.componentDidMount()
        message.success('您已成功删除项目');
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
      visible7: false,
    }); 
  }
  // 新增弹出框--拷贝
  showModal5 = () => {
    if(this.state.rowId === undefined){
      message.error('请单击选中列表一行');
      this.setState({
        visible5: false,
      }); 
    }else{
      this.setState({
        visible5: true,
      });
    }
  }
  handleOk5 = () => {
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    param.append('projectId', this.state.rowId)
    param.append('mark',0)
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/project/copyProject",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      if(res.data.result === "SUCCESS"){
        this.componentDidMount()
        message.success('您已成功拷贝项目');
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
      visible5: false,
    }); 
  }
  // 新增弹出框--拷贝-2
  handleOk6 = () => {
    let param = new URLSearchParams()
    param.append('token', window.localStorage.token)
    param.append('projectId', this.state.rowId)
    param.append('toCopyUser',this.refs.toCopyUser.state.value ? this.refs.toCopyUser.state.value :"")
    window.$axios({
      method:"POST",
      url:"/ubc/siemens/console/project/copyProject",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      if(res.data.result === "SUCCESS"){
        message.success('您已成功拷贝项目');
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
      visible6: false,
    }); 
  }
  // 取消
  handleCancel = () => {
    this.setState({
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
    });
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`请输入搜索内容`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="filter" theme="filled"  style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }
  // 正则校验经纬度
  // 经度
  longitude(){
    let longitude = /^-?(?:(?:180(?:\.0{1,3})?)|(?:(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d{1,3})?))$/
    //经度
    if(this.refs.longitude.state.value === undefined || this.refs.longitude.state.value === "" || this.refs.longitude.state.value.slice(0,1) === " "){
      this.setState({
        erojd:"经度必填",
        erojds:true,
      })
      return false
    }else if(!longitude.test(this.refs.longitude.state.value)){
      this.setState({
        erojd:"-180到180之间",
        erojds:true,
      })
      return false
    }else{
      this.setState({
        erojd:"",
        erojds:false,
      })
      return true
    }
  }
  // 纬度
  latitude(){
    let latitude = /^-?(?:90(?:\.0{1,3})?|(?:[1-8]?\d(?:\.\d{1,3})?))$/
    //纬度
    if(this.refs.latitude.state.value === undefined || this.refs.latitude.state.value === "" || this.refs.latitude.state.value.slice(0,1) === " "){
      this.setState({
        erowd:"经度必填",
        erowds:true,
      })
      return false
    }else if(!latitude.test(this.refs.latitude.state.value)){
      this.setState({
        erowd:"-90到90之间",
        erowds:true,
      })
      return false
    }else{
      this.setState({
        erowd:"",
        erowds:false,
      })
      return true
    }
  }
  // update
  update(){
    const file = document.querySelector('[type=file]');
    let straaa = file.value.substr(file.value.lastIndexOf("\\")+1); 
    const formData = new FormData();
    formData.append("token", window.localStorage.token);
    formData.append("projectId", window.localStorage.xmid);
    formData.append("file", file.files[0]);
    formData.append("fileName", straaa);
    window.$axios({
      method:"POST",
      url:"/ubc//siemens/console/project/uploadAssets",
      data:formData,
      headers:{
        'Content-Type':'multipart/form-data'
      }
    }).then((res)=>{
      if(res.data.result === "SUCCESS"){
        message.success('上传完成');
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
   // search
   searchxm(){
    if(this.refs.searchxm.state.value === '' || this.refs.searchxm.state.value === undefined){
      return
    }else{
      let param = new URLSearchParams()
      param.append('token', window.localStorage.token)
      param.append('projectName', this.refs.searchxm.state.value)
      window.$axios({
        method:"POST",
        url:"/ubc/siemens/console/project/getListProject",
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
        }else{
          message.error(res.data.msg)
        }
        this.setState({
          rowId: undefined,
        });
      })
    }
  }
  // 取消搜索
  qkhd(){
    if(this.refs.searchxm.state.value === '' || this.refs.searchxm.state.value === undefined){
      this.componentDidMount()
    }
  }
  // 校验
  projectName(){
    //项目名
    if(this.refs.projectName.state.value === undefined || this.refs.projectName.state.value === "" || this.refs.projectName.state.value.slice(0,1) === " "){
      this.setState({
        eroProName:"项目名称必填",
        eroProNames:true,
      })
      return false
    }else{
      this.setState({
        eroProName:"",
        eroProNames:false,
      })
      return true
    }
  }
  eroCity(){
    //城市
    if(this.refs.city.state.value === undefined || this.refs.city.state.value === "" || this.refs.city.state.value.slice(0,1) === " "){
      this.setState({
        eroCity:"城市必填",
        eroCitys:true,
      })
      return false
    }else{
      this.setState({
        eroCity:"",
        eroCitys:false,
      })
      return true
    }
  }
  eroUsr(){
    //项目管理员
    if(this.refs.userName.state.value === undefined || this.refs.userName.state.value === "" || this.refs.userName.state.value.slice(0,1) === " "){
      this.setState({
        eroUsr:"项目管理员必填",
        eroUsrs:true,
      })
      return false
    }else{
      this.setState({
        eroUsr:"",
        eroUsrs:false,
      })
      return true
    }
  }
  eroshare(){
    //分享
    if(this.refs.toShareUser.state.value === undefined || this.refs.toShareUser.state.value === "" || this.refs.toShareUser.state.value.slice(0,1) === " "){
      this.setState({
        share:"请填写分享信息",
        eroshare:true,
      })
      return false
    }else{
      this.setState({
        share:"",
        eroshare:false,
      })
      return true
    }
  }

  render() {
    // table-------------------------------------------------------------------------------
    const columns = [{
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      render: text => <Link to="/Home/treePage" style={{color:'#006486'}}>{text}</Link>,
    }, {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      ...this.getColumnSearchProps('city'),
    }, {
      title: '竣工时间',
      dataIndex: 'completionTime',
      key: 'completionTime',
      sorter: (a, b) => a.completionTime - b.completionTime,
      render: (record,key) => (
        <span>
          <span>{key.strCompletionTime}</span>
        </span>
      )
    }, {
      title: '项目管理员',
      dataIndex: 'userName',
      key: 'userName',
    }, {
      title: '项目状态',
      dataIndex: 'projectStatus',
      key: 'projectStatus',
      render: (record) => (
        <span>
          <span>{record === '0' ? '在保' : '过保'}</span>
        </span>
      )
    }, {
      title: '运行状态',
      dataIndex: 'runStatus',
      key: 'runStatus',
      render: (record,key) => (
        <span>
          <span style={{display:'flex',position:'relative',alignItems:'center'}}>
            {this.state.data.map((item)=>{
                  if(item.id === key.id){
                    return(
                      <div className="point" key={item.id} style={{background:item.runStatus === "0" ? "#0DAA1A" : "#D92828"}}></div>
                    )
                  }
                  return ""
            })}
            <span style={{marginLeft:'0.5vw'}}>{record === '0' ? '正常' : '故障'}</span>
          </span>
        </span>
      )
    }, {
      title: '工单跟踪',
      dataIndex: 'workOrder',
      key: 'workOrder',
    }, {
      title: '项目描述',
      dataIndex: 'projectDepict',
      key: 'projectDepict',
    }, {
      title: '项目资产',
      dataIndex: 'ProAssets',
      key: 'ProAssets',
      render: () => (
        <span>
          <span onClick={this.showModalxq} style={{color:'#006486',cursor:'pointer'}}>详情</span>
        </span>
      ),
    },  {
      title: '设备列表',
      key: 'equipmentList',
      render: () => (
        <span>
          <Link to="/Home/equipmentList" style={{color:'#006486'}}>详情</Link>
        </span>
      ),
    }]
    const { confirmLoading, visible3, visible4, visible5, visible6, visible7} = this.state;//弹出
    return (
      <div id="ProjectManage">
        <div className="link2">
          <Link to="/Home/main"><span style={{color:'#374B5A',marginRight:'5px'}}>首页</span></Link><span>></span><span style={{color:'#879BAA',marginLeft:'5px'}}>项目管理</span>
        </div>
        <div className="userHead">
          <div className="userText" style={{display:'flex'}}>
            <Input placeholder="项目名称" ref="searchxm" onBlur={this.qkhd.bind(this)}/>
            <div className='search' onClick={this.searchxm.bind(this)}><img src={search} alt="" style={{width:"16px"}}></img></div>
          </div>
          <div style={{display:'flex'}}>
            <Button type="primary" onClick={this.showDrawer.bind(this)}>增加项目</Button>
            <ChangeDrawer
            visible={this.state.ChangeDrawer}
            onCancel={()=>{ this.setState({ ChangeDrawer: false })}}
            successbj={this.successbj.bind(this)}
            ></ChangeDrawer>
            <Button onClick={this.showModal6.bind(this)}>删除项目</Button>
            <Button onClick={this.showModal.bind(this)}>分享项目</Button>
            <Button onClick={this.showModal5.bind(this)}>拷贝项目</Button>
            {/* 新增项目---右侧抽屉部分 */}
            <Drawer
              title="新增项目"
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible1}
              width='37.2vw'
              style={{lineHeight:'25px'}}
              className="drawerStyle"
            > 
              <Row type="flex" justify="center" style={{marginBottom:'16px'}}>
                <Col span={6} className="right">项目名称:</Col>
                <Col span={17}>
                  <Input placeholder="请输入" ref="projectName" onBlur={this.projectName.bind(this)} className={this.state.eroProNames === true ? 'eroProNames' : ''}/>
                  <span className="errorInfo">
                    {this.state.eroProName === undefined ? "" : `${this.state.eroProName}`}
                  </span>
                </Col>
              </Row>
              <Row type="flex" justify="center" style={{marginBottom:'16px'}}>
                <Col span={6} className="right">城市:</Col>
                <Col span={17}>
                  <Input placeholder="请输入" ref="city" onBlur={this.eroCity.bind(this)} className={this.state.eroCitys === true ? 'eroCitys' : ''}/>
                  <span className="errorInfo">
                    {this.state.eroCity === undefined ? "" : `${this.state.eroCity}`}
                  </span>
                </Col>
              </Row>
              <Row type="flex" justify="center" style={{marginBottom:'16px'}}>
                <Col span={6} className="right">竣工时间:</Col>
                <Col span={17}>
                  <DatePicker onChange={this.onChange} style={{width:'100%'}}/>
                </Col>
              </Row>
              <Row type="flex" justify="center" style={{marginBottom:'16px'}}>
                <Col span={6} className="right">项目管理员:</Col>
                <Col span={17}>
                  <Input placeholder="请输入" ref="userName" onBlur={this.eroUsr.bind(this)} className={this.state.eroUsrs === true ? 'eroUsrs' : ''}/>
                  <span className="errorInfo">
                    {this.state.eroUsr === undefined ? "" : `${this.state.eroUsr}`}
                  </span>
                </Col>
              </Row>
              <Row type="flex" justify="center" style={{marginBottom:'16px'}}>
                <Col span={6} className="right">经度:</Col>
                <Col span={17}>
                  <Input placeholder="请输入" ref="longitude" onBlur={this.longitude.bind(this)} className={this.state.erojds === true ? 'erojds' : ''}/>
                  <span className="errorInfo">
                    {this.state.erojd === undefined ? "" : `${this.state.erojd}`}
                  </span>
                </Col>
              </Row>
              <Row type="flex" justify="center" style={{marginBottom:'16px'}}>
                <Col span={6} className="right">纬度:</Col>
                <Col span={17}>
                  <Input placeholder="请输入" ref="latitude" onBlur={this.latitude.bind(this)} className={this.state.erowds === true ? 'erowds' : ''}/>
                  <span className="errorInfo">
                    {this.state.erowd === undefined ? "" : `${this.state.erowd}`}
                  </span>
                </Col>
              </Row>
              <Row type="flex" justify="center" style={{marginBottom:'16px'}}>
                <Col span={6} className="right">项目状态:</Col>
                <Col span={17} style={{lineHeight:'32px'}}>
                  <RadioGroup options={plainOptions} onChange={this.onChange1} value={this.state.value1}/>
                </Col>
              </Row>
              <Row type="flex" justify="center" style={{marginBottom:'16px'}}>
                <Col span={6} className="right">运行状态:</Col>
                <Col span={17} style={{lineHeight:'32px'}}>
                <RadioGroup options={plainOptions2} onChange={this.onChange2} value={this.state.value}/>
                </Col>
              </Row>
              <Row type="flex" justify="center" style={{marginBottom:'16px'}}>
                <Col span={6} className="rightn">工单跟踪:</Col>
                <Col span={17}><Input placeholder="请输入" ref="workOrder"/></Col>
              </Row>
              <Row type="flex" justify="center" style={{marginBottom:'16px'}}>
                <Col span={6} className="rightn">项目描述:</Col>
                <Col span={17}><Input placeholder="请输入" ref="projectDepict"/></Col>
              </Row>
              <Row type="flex" justify="end" style={{marginBottom:'16px'}}>
              <Col span={9} style={{position:'absolute',bottom:'19px',right:'13px'}}>
                <Button onClick={this.onClose.bind(this)}>取消</Button>
                <Button onClick={this.success.bind(this)} type="primary" style={{marginLeft:'6px'}}>确定</Button>
              </Col>
              </Row>
            </Drawer>
            {/* 分享项目 */}
            <Modal
              title="分享项目"
              visible={visible3}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
              className="modalList"
            >
              <Row type="flex" justify="center" style={{marginTop:'20px',marginBottom:'20px'}}>
                <Col span={4} className="right">分享信息：</Col>
                <Col span={18}>
                  <Input placeholder="请输入用户名/手机号/邮箱地址" ref="toShareUser" onBlur={this.eroshare.bind(this)} className={this.state.eroshare === true ? 'eroshare' : ''}/>
                  <span className="errorInfo">
                    {this.state.share === undefined ? "" : `${this.state.share}`}
                  </span>
                </Col>
              </Row>
            </Modal>
             {/* 项目资产 */}
             <Modal
              title="项目资产"
              visible={visible4}
              onOk={this.handleOkxq}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
              footer={null}
            >
              <Row type="flex" style={{marginTop:'16px'}}>
                <input type="file" name="file" onChange={this.update}></input>
              </Row>
            </Modal>
            {/* 删除项目 */}
            <Modal
              title="删除项目"
              visible={visible7}
              onOk={this.handleOk7}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
              className="modalList"
            >
              <div>
                <img src={del} alt="" style={{width:"25px",zIndex:'999',marginRight:'10px'}}></img>
                确认删除项目相关的信息吗？</div>
            </Modal>
            {/* 拷贝项目 */}
            <Modal
              title="拷贝项目"
              visible={visible5}
              onOk={this.handleOk5}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
              className="modalList"
            >
              <div>
                <img src={setAlart} alt="" style={{width:"25px",zIndex:'999',marginRight:'10px'}}></img>
                确认拷贝该项目相关的设备信息吗？</div>
            </Modal>
            {/* 拷贝项目二 */}
            <Modal
              title="拷贝项目"
              visible={visible6}
              onOk={this.handleOk6}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
              className="modalList"
            >
              <Row type="flex" justify="center" style={{marginTop:'20px',marginBottom:'20px'}}>
                <Col span={4} className="right">拷贝信息：</Col>
                <Col span={18}><Input placeholder="请输入用户名/手机号/邮箱地址" ref="toCopyUser"/></Col>
              </Row>
            </Modal>
          </div>
        </div>
        {/* Tab */}
        <Table columns={columns} dataSource={this.state.data} bordered onRow={this.onClickRow} rowClassName={this.setRowClassName} pagination={{pageSize:8}} total={50} loading={this.state.loading}/>
      </div>
    );
  }
}

export default Project;
