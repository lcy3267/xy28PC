import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Tabs, Icon} from 'antd';
import {placeType, isWinning, betTypeArr} from '../../config';
import {getFrontDate} from '../../utils/formatUtil';

const TabPane = Tabs.TabPane;

class LotteryRecords extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      bjRecords: [],
      cndRecords: []
    };
  }

  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span><Icon type="apple" />北京开奖记录</span>} key="1">
          <LotteryTable dispatch={this.props.dispatch} type="1"/>
        </TabPane>
        <TabPane tab={<span><Icon type="android" />加拿大开奖记录</span>} key="2">
          <LotteryTable dispatch={this.props.dispatch} type="2"/>
        </TabPane>
      </Tabs>
    );
  }
}

class LotteryTable extends Component{
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {
        pageIndex: 1,
        count: 0,
        records: [],
      };
    }

  componentWillMount() {
    this.loadTable();
  }

  loadTable = ()=>{
    this.props.dispatch({
      type: 'lottery/records',
      params: {
        pageIndex: this.state.pageIndex,
        type: this.props.type,
      },
      callback: (rs)=>{
        this.setState({records: rs.records, count: rs.count});
      }
    });
  }

  columns = [
    {title: '期号', dataIndex: 'serial_number',},
    {
      title: '时间', dataIndex: 'created_at',
      render: (text)=>getFrontDate(text, 'yyyy-MM-dd hh:mm')
    },
    {
      title: '开奖号码', dataIndex: 'numbers',
      render: (text, record)=>this.getNumbers(record)
    },
    {
      title: '开奖类型', dataIndex: 'result_type',
      render: (text, record)=>this.resultType(record)
    },
    {title: '是否开奖', dataIndex: 'is_open'},
  ];

  resultType = (record)=>{
    let hasMax = '大';
    let hasDouble = '单';
    if(record.sum_number <= 13){
      hasMax = '小'
    }
    if(record.sum_number % 2 == 0){
      hasDouble = '双'
    }
    return `${hasMax}, ${hasDouble}, ${hasMax+hasDouble}`;
  };

  getNumbers = (records)=>{
    let {first_number, second_number, third_number, sum_number} = records;
    return `${first_number} + ${second_number} + ${third_number} = ${sum_number}`;
  };

  nextPage =(pageIndex)=>{
    this.setState({pageIndex},()=>{
      this.loadTable();
    })
  };

  render(){
    return (
      <Table
        rowKey={record => record.lottery_record_id}
        columns={this.columns}
        dataSource={this.state.records}
        pagination={{ pageSize: 10, total: this.state.count, onChange:this.nextPage}}
      />
    )
  }
}

export default connect(({})=> {
  return {};
})(LotteryRecords);
