import React from 'react';
import './index.css'
import { Tabs, Select, Checkbox, Button } from 'antd';
import { Link } from "react-router-dom"
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

// tab
const TabPane = Tabs.TabPane;
// select
const Option = Select.Option;
class TablePage extends React.Component{
    
  handleChange(value) {
    console.log(`selected ${value}`);
  }
  // checkbox
  onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  componentDidMount(){
    this.callback()
  }
  callback(key) {
    // if(key === "1"){
      this.echars1()
    // }
    // if(key === "2"){
      setTimeout(this.echars2(),1000);
    // }
  }
  echars1(){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echars1'));
    console.log(document.getElementById('echars1'))
    // 绘制图表
    myChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#738796'
            }
          },
          formatter: function (params) { 
            var res='<div><p>'+params[0].name+'</p></div>' 
            // for(var i=0;i<params.length;i++){
            // res+='<p>'+params[i].seriesName+':'+params[i].data / 10 +'</p>'
            // }
            res+='<p>'+params[0].seriesName+':'+params[0].data / 100 +'</p>'
            res+='<p>'+params[1].seriesName+':'+params[1].data * 10 +'</p>'
            res+='<p>'+params[2].seriesName+':'+params[2].data +'</p>'
            return res;
          },
        },
        legend: {
          icon: 'circle',
          x: 'center', 
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 13,
          data: ['阈值', '湿度', '温度'],
          right: '4%',
          top: '2%',
          textStyle: {
            fontSize: 12,
            color: '#738796'
          }
        },
        grid: {
          left: '2%',
          right: '8%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel:{color:'rgba(0,0,0,0.65)'},
          axisLine: {
            lineStyle: {
              color: '#DFDFDF'
            }
          },
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00','09:00','10:00','11:00','12:00']
      }],
      yAxis: [{
          type: 'value',
          max:100,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#DFDFDF'
            }
          },
          axisLabel: {
            show:false,
          },
          splitLine: {
            lineStyle: {
              color: '#E6E6E6',
              type:'dashed'
            }
          }
        }],
        series: [{
          name: '阈值',
          type: 'line',
          smooth: false,
          symbolSize:6,
          lineStyle: {
            normal: {
              width: 2
            }
          },
          itemStyle: {
            normal: {
              color: '#9BA1EC'
            }
          },
          data: [0,null, 0, 100, 0, 100, 0, 100, 100, 100, 0, 100, 0]
      }, {
          name: '湿度',
          type: 'line',
          smooth: false,
          symbolSize:6,
          lineStyle: {
            normal: {
              width: 2
            }
          },
          itemStyle: {
            normal: {
              color: '#E8A399'
            }
          },
           data: [10.0, 10.5, 11.5, 12.3, 15.4, 14.5, 15.8, 16.7, 13.2, 12.7, 11.6, 68, 12.0]
      }, {
          name: '温度',
          type: 'line',
          smooth: false,
          symbolSize:6,
          lineStyle: {
            normal: {
              width: 2
            }
          },
          itemStyle: {
            normal: {
              color: '#EBAB6E'
            }
          },
          data: [50, 55, 60, 53, 75, 80, 73, 99, 85, 93, 84, 89, 32]
      }, ]
    });
  }
  echars2(){
    // 基于准备好的dom，初始化echarts实例
    var myChart2 = echarts.init(document.getElementById('echars2'));
    console.log(document.getElementById('echars2'))
    // 绘制图表
    myChart2.setOption({
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#738796'
          }
        },
        formatter: function (params) { 
          console.log(params)
            var res='<div><p>'+params[0].name+'</p></div>' 
            // for(var i=0;i<params.length;i++){
            // res+='<p>'+params[i].seriesName+':'+params[i].data / 10 +'</p>'
            // }
            res+='<p>'+params[0].seriesName+':'+params[0].data / 100 +'</p>'
            res+='<p>'+params[1].seriesName+':'+params[1].data / 10 +'</p>'
            return res;
        },
      },
      legend: {
        icon: 'circle',
        x: 'center', 
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 13,
        data: ['阈值', '湿度'],
        right: '4%',
        top: '2%',
        textStyle: {
            fontSize: 12,
            color: '#738796'
        }
      },
      grid: {
        left: '2%',
        right: '8%',
        bottom: '2%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLabel:{color:'rgba(0,0,0,0.65)'},
        axisLine: {
            lineStyle: {
                color: '#DFDFDF'
            }
        },
        data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00','09:00','10:00','11:00','12:00']
    }],
    yAxis: [{
        type: 'value',
        max:100,
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#DFDFDF'
            }
        },
        axisLabel: {
            show:false,
        },
        splitLine: {
            lineStyle: {
                color: '#E6E6E6',
                type:'dashed'
            }
        }
      }],
      series: [{
        name: '阈值',
        type: 'line',
        smooth: false,
        symbolSize:6,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        itemStyle: {
            normal: {
                color: '#9BA1EC'
            }
        },
        data: [0, 100, 0, 100, 0, 100, 0, 100, 100, 100, 0, 100, 0]
    }, {
        name: '湿度',
        type: 'line',
        smooth: false,
        symbolSize:6,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        itemStyle: {
            normal: {
                color: '#E8A399'
            }
        },
        data: [10.0, 10.5, 11.5, 12.3, 15.4, 14.5, 15.8, 16.7, 13.2, 12.7, 11.6, 68, 12.0]
      },]
    });
  }

  render() {
    return (
      <div id="TablePage">
        <div className="link4">
          <Link to="/Home/main"><span style={{color:'#374B5A',marginRight:'5px'}}>首页</span></Link><span>></span>
          <span style={{color:'#879BAA',marginLeft:'5px'}}>数据趋势</span>
        </div>
        {/* Tab */}
        <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)} type="card">
          <TabPane tab="趋势图1" key="1">
            <div className="up"><div id="echars1" style={{height:'48.8vh'}}></div></div>
            <div className="down">
              <div className="down1" id="bbb">
                <Select defaultValue="1" onChange={this.handleChange}>
                    <Option value="1">万达广场</Option>
                    <Option value="2">银泰广场</Option>
                    <Option value="3">西湖广场</Option>
                </Select>
              </div>
              <div className="down2">
                <div className="down2box1">
                    <Checkbox onChange={this.onChange} defaultChecked={true}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">Room_Temp</Option>
                            <Option value="2">Room_Temp</Option>
                            <Option value="3">Room_Temp</Option>
                        </Select>
                    </div>
                </div>
                <div className="down2box1">
                    <Checkbox onChange={this.onChange} defaultChecked={true}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">Supply_Temp</Option>
                            <Option value="2">Supply_Temp</Option>
                            <Option value="3">Supply_Temp</Option>
                        </Select>
                    </div>
                </div>
                <div className="down2box1">
                    <Checkbox onChange={this.onChange}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">Fan_Command</Option>
                            <Option value="2">Fan_Command</Option>
                            <Option value="3">Fan_Command</Option>
                        </Select>
                    </div>
                </div>
              </div>
              <div className="down3">
                <div className="down3box1">
                    <Checkbox onChange={this.onChange} defaultChecked={true}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="lucy" onChange={this.handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </div>
                </div>
                <div className="down3box1">
                    <Checkbox onChange={this.onChange}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="lucy" onChange={this.handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </div>
                </div>
                <div className="down3box1">
                    <Checkbox onChange={this.onChange}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="lucy" onChange={this.handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </div>
                </div>
              </div>
              <Button type="primary" style={{marginLeft:'37px'}}>确定</Button>
            </div>
          </TabPane>
          <TabPane tab="趋势图2" key="2" forceRender={true}>
          <div className="up"><div id="echars2" style={{height:'48.8vh'}}></div></div>
            <div className="down">
              <div className="down1" id="bbb">
                <Select defaultValue="1" onChange={this.handleChange}>
                    <Option value="1">万达广场</Option>
                    <Option value="2">银泰广场</Option>
                    <Option value="3">西湖广场</Option>
                </Select>
              </div>
              <div className="down2">
                <div className="down2box1">
                    <Checkbox onChange={this.onChange} defaultChecked={true}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">Room_Temp</Option>
                            <Option value="2">Room_Temp</Option>
                            <Option value="3">Room_Temp</Option>
                        </Select>
                    </div>
                </div>
                <div className="down2box1">
                    <Checkbox onChange={this.onChange}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">Supply_Temp</Option>
                            <Option value="2">Supply_Temp</Option>
                            <Option value="3">Supply_Temp</Option>
                        </Select>
                    </div>
                </div>
                <div className="down2box1">
                    <Checkbox onChange={this.onChange}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">Fan_Command</Option>
                            <Option value="2">Fan_Command</Option>
                            <Option value="3">Fan_Command</Option>
                        </Select>
                    </div>
                </div>
              </div>
              <div className="down3">
                <div className="down3box1">
                    <Checkbox onChange={this.onChange} defaultChecked={true}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="lucy" onChange={this.handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </div>
                </div>
                <div className="down3box1">
                    <Checkbox onChange={this.onChange}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="lucy" onChange={this.handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </div>
                </div>
                <div className="down3box1">
                    <Checkbox onChange={this.onChange}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="lucy" onChange={this.handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </div>
                </div>
              </div>
              <Button type="primary" style={{marginLeft:'37px'}}>确定</Button>
            </div>
          </TabPane>
          <TabPane tab="临时趋势图" key="3">
          <div className="up"><div id="echars3" style={{height:'48.8vh'}}></div></div>
            <div className="down">
              <div className="down1" id="bbb">
                <Select defaultValue="1" onChange={this.handleChange}>
                    <Option value="1">万达广场</Option>
                    <Option value="2">银泰广场</Option>
                    <Option value="3">西湖广场</Option>
                </Select>
              </div>
              <div className="down2">
                <div className="down2box1">
                    <Checkbox onChange={this.onChange} defaultChecked={true}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">Room_Temp</Option>
                            <Option value="2">Room_Temp</Option>
                            <Option value="3">Room_Temp</Option>
                        </Select>
                    </div>
                </div>
                <div className="down2box1">
                    <Checkbox onChange={this.onChange}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">Supply_Temp</Option>
                            <Option value="2">Supply_Temp</Option>
                            <Option value="3">Supply_Temp</Option>
                        </Select>
                    </div>
                </div>
                <div className="down2box1">
                    <Checkbox onChange={this.onChange}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">Fan_Command</Option>
                            <Option value="2">Fan_Command</Option>
                            <Option value="3">Fan_Command</Option>
                        </Select>
                    </div>
                </div>
              </div>
              <div className="down3">
                <div className="down3box1">
                    <Checkbox onChange={this.onChange} defaultChecked={true}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="lucy" onChange={this.handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </div>
                </div>
                <div className="down3box1">
                    <Checkbox onChange={this.onChange}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="lucy" onChange={this.handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </div>
                </div>
                <div className="down3box1">
                    <Checkbox onChange={this.onChange}></Checkbox>
                    <div className="aaa" id="aaa">
                        <Select defaultValue="1" onChange={this.handleChange}>
                            <Option value="1">RWG1</Option>
                            <Option value="2">RWG1</Option>
                            <Option value="3">RWG1</Option>
                        </Select>
                    </div>
                    <div className="bbb" id="bbb">
                        <Select defaultValue="lucy" onChange={this.handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </div>
                </div>
              </div>
              <Button type="primary" style={{marginLeft:'37px'}}>确定</Button>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default TablePage;
