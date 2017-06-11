import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Modal,message, DatePicker} from 'antd';
import {placeType, isWinning, betTypeArr} from '../../config';
import moment from 'moment';


class RollbackRecord extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      pageIndex: 1,
      count: 0,
      records: [],
      date: moment().format('YYYY-MM-DD')
    };
  }

  componentWillMount() {
    this.loadList();
  }

  loadList = ()=>{
    this.props.dispatch({
      type: "rollback/rollbackRecord",
      params: {
        pageIndex: this.state.pageIndex,
        date: this.state.date,
      },
      callback: (rs)=>{
        this.setState({records: rs.records});
      }
    });
  }

  columns = [
    {title: '回水玩家账号', dataIndex: 'account',},
    {title: '回水玩家昵称', dataIndex: 'name',},
    {title: '回水金额', dataIndex: 'integral',},
    {title: '回水级别', dataIndex: 'room_level',
      render: (text)=>text == 1?'初级':text == 2?'中级':text == 3?'高级':''
    },
    {title: '回水时间', dataIndex: 'created_at',},
  ];

  nextPage = (pageIndex)=>{
    this.setState({pageIndex},()=>{
      this.loadList();
    })
  }

  onChange = (date, dateString)=>{
    this.setState({date: dateString},()=>{
      this.loadList();
    })
  }

  render() {
    return (
      <div>
        <div style={{fontSize: 15,height: 30,marginBottom: 10}}>
          <span>日期:
            <DatePicker
              defaultValue={moment()}
              onChange={this.onChange} style={{margin: '0 20px'}}/>
          </span>
          <span>玩家回水计算</span>
        </div>
        <Table
          rowKey={record => record.id}
          dataSource={ this.state.records } columns={this.columns}
          pagination={{ pageSize: 10, total: this.state.count, onChange:this.nextPage}}
        />
      </div>
    );
  }
}

export default connect(({user})=> {
  return {user};
})(RollbackRecord);
