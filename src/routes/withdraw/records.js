/**
 * Created by chengyuan on 2017/5/26.
 */
import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Modal, Input, message, InputNumber} from 'antd';
import {getFrontDate} from '../../utils/formatUtil';
import {placeType, isWinning, betTypeArr} from '../../config';

class UserList extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      records: [],
      count: 0,
      pageIndex: 1,
    };
  }

  componentWillMount() {
    this.loadRecords();
  }

  loadRecords = ()=>{
    this.props.dispatch({
      type: "withdraw/records",
      params: {
        pageIndex: this.state.pageIndex
      },
      callback: (rs)=>{
        this.setState({records: rs.records, count: rs.count});
      }
    });
  }

  columns = [
    {
      title: '操作', dataIndex: 'operation',
      render: (text, record)=>this.getOperation(record)
    },
    {
      title: '状态', dataIndex: 'status',
      render: (text)=>text == 2?'已通过':text == 3?'已拒绝':'待审核'
    },
    {title: '用户账号', dataIndex: 'user_account'},

    {title: '用户名称', dataIndex: 'user_name'},
    {title: '提现银行', dataIndex: 'bank_name',},
    {title: '提现银行账号', dataIndex: 'bank_account',},
    {title: '提现金额', dataIndex: 'withdraw_money',},
    {title: '提现申请时间', dataIndex: 'created_at', render: (text)=>getFrontDate(text,'yyyy-MM-dd hh:ss')},
  ];

  getOperation = (record)=>{
    if(record.status != 1) return '- -';
    return [
      <a key="1" onClick={()=>{this.approve(record, 2)}}>通过</a>,
      <a key="2" onClick={()=>{this.approve(record, 3)}} style={{marginLeft: 20}}>拒绝</a>
    ];
  };

  approve = (record, status)=>{
    let str = status == 2 ? '通过' : '拒绝';
    Modal.confirm({
      title: '提示',
      content: <div>是否<span style={{color: 'red'}}>{str}</span>
        {record.user_name}的提现申请的提现申请</div>,
      onOk: ()=>{
        this.props.dispatch({
          type: 'withdraw/updateWithdraw',
          params: {
            id: record.id,
            status
          },
          callback: ()=>{
            this.loadRecords();
            message.success('操作成功!!');
          }
        })
      }
    })
  };

  nextPage = (pageIndex)=>{
    this.setState({pageIndex},()=>{
      this.loadRecords();
    })
  };

  render() {
    return (
      <div>
        <div style={{fontSize: 15,height: 30}}>玩家提现申请记录</div>
        <Table
          rowKey='id'
          dataSource={ this.state.records } columns={this.columns}
          pagination={{ pageSize: 10, total: this.state.count, onChange:this.nextPage}}
        />
      </div>
    );
  }
}

export default connect(({user})=> {
  return {user};
})(UserList);
