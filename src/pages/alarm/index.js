import React from 'react';
import './index.css'
import { Table, Button, Input, Icon } from 'antd';
import { Link } from "react-router-dom"
// search
const Search = Input.Search;
class Alarm extends React.Component{
  // table-------------------------------------------------------------------------------
  // Tab-data
  data = [{
    key: '1',
    alarmDevice:'gateway1',
    alarmType:'通知',
    subequipment:'RWG1',
    alarmTime:'2018-12-24 16:23:13',
    mesPush:'已发送SMS到156xxxxx',
    state:'在线',
  },{
    key: '2',
    alarmDevice:'gateway1',
    alarmType:'紧急',
    subequipment:'RWG2',
    alarmTime:'2018-12-24 16:16:13',
    mesPush:'发送email到@dssd',
    state:'在线',
  },{
    key: '3',
    alarmDevice:'gateway1',
    alarmType:'通知',
    subequipment:'RWG1',
    alarmTime:'2018-12-22 08:23:13',
    mesPush:'已发送SMS到138xxxxx',
    state:'在线',
  },{
    key: '4',
    alarmDevice:'gateway1',
    alarmType:'通知',
    subequipment:'RWG1',
    alarmTime:'2018-12-22 08:23:13',
    mesPush:'已发送SMS到138xxxxx',
    state:'在线',
  },{
    key: '5',
    alarmDevice:'gateway1',
    alarmType:'通知',
    subequipment:'RWG1',
    alarmTime:'2018-12-22 08:23:13',
    mesPush:'已发送SMS到138xxxxx',
    state:'在线',
  },{
    key: '6',
    alarmDevice:'gateway1',
    alarmType:'通知',
    subequipment:'RWG1',
    alarmTime:'2018-12-22 08:23:13',
    mesPush:'已发送SMS到138xxxxx',
    state:'在线',
  },{
    key: '7',
    alarmDevice:'gateway1',
    alarmType:'通知',
    subequipment:'RWG1',
    alarmTime:'2018-12-22 08:23:13',
    mesPush:'已发送SMS到138xxxxx',
    state:'在线',
  },{
    key: '8',
    alarmDevice:'gateway1',
    alarmType:'通知',
    subequipment:'RWG1',
    alarmTime:'2018-12-22 08:23:13',
    mesPush:'已发送SMS到138xxxxx',
    state:'在线',
  },{
    key: '9',
    alarmDevice:'gateway1',
    alarmType:'通知',
    subequipment:'RWG1',
    alarmTime:'2018-12-22 08:23:13',
    mesPush:'已发送SMS到138xxxxx',
    state:'在线',
  },{
    key: '10',
    alarmDevice:'gateway1',
    alarmType:'通知',
    subequipment:'RWG1',
    alarmTime:'2018-12-22 08:23:13',
    mesPush:'已发送SMS到138xxxxx',
    state:'在线',
  },{
    key: '11',
    alarmDevice:'gateway1',
    alarmType:'通知',
    subequipment:'RWG1',
    alarmTime:'2018-12-22 08:23:13',
    mesPush:'已发送SMS到138xxxxx',
    state:'在线',
  }]
  state = {
    searchText: '',
  };

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
  render() {
    const columns = [{
      title: '报警名称',
      dataIndex: 'alarmDevice',
      key: 'alarmDevice',
    },{
      title: '报警类型',
      dataIndex: 'alarmType',
      key: 'alarmType',
    },{
      title: '所属设备',
      dataIndex: 'subequipment',
      key: 'subequipment',
    },{
      title: '报警发生时间',
      dataIndex: 'alarmTime',
      key: 'alarmTime',
    },{
      title: '消息推送',
      dataIndex: 'mesPush',
      key: 'mesPush',
    },{
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      ...this.getColumnSearchProps('state'),
    }]
    return (
      <div id="Alarm">
        <div className="link6">
          <Link to="/Home/main"><span style={{color:'#374B5A',marginRight:'5px'}}>首页</span></Link><span>></span>
          <span style={{color:'#879BAA',marginLeft:'5px'}}>报警</span>
        </div>
        <div className="userHead">
          <div className="userText">
            <Search
                placeholder="搜索"
                onSearch={value => console.log(value)}
                style={{ width: 200,marginRight:'20px' }}
              />
          </div>
          <div>
            <Button type="primary" >导出历史报警记录</Button>
          </div>
        </div>
        {/* Tab */}
        <Table columns={columns} dataSource={this.data} pagination={{pageSize:8}}/>;
        {/* <Table rowSelection={this.rowSelection} columns={columns} dataSource={this.data} bordered pagination={{pageSize:10}}/> */}
      </div>
    );
  }
}

export default Alarm;
