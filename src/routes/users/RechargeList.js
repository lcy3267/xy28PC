/**
 * Created by chengyuan on 2017/5/1.
 */
import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Modal, message} from 'antd';
import {getFrontDate} from '../../utils/formatUtil';
import {rechargeType} from '../../config';

class RechargeList extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      records: [],
    };
  }

  componentWillMount() {
    this.loadList();
  }

  loadList = (params = {pageIndex: 1})=>{
    this.props.dispatch({
      type: 'recharge/getRecords',
      params,
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
    {title: '用户账号', dataIndex: 'user_account',},
    {title: '用户昵称', dataIndex: 'user_name',},
    {title: '充值状态', dataIndex: 'status', render: (text)=>(text == 1?'待充值':'已充值')},
    {title: '充值金额', dataIndex: 'money',},
    {title: '充值渠道', dataIndex: 'recharge_type',render: (text)=>this.formatType(text)},
    {title: '备注', dataIndex: 'remark',},
    {title: '创建时间', dataIndex: 'created_at', render: (text)=>getFrontDate(text,'yyyy-MM-dd hh:ss')},
    {title: '修改时间', dataIndex: 'updated_at', render: (text)=>getFrontDate(text,'yyyy-MM-dd hh:ss')},
  ];

  getOperation = (record)=>{
    if(record.status == 2) return "- -";
    return (
      <span>
        <a style={{marginRight: 10}} onClick={()=>{this.approve(record)}}>通过</a>
      </span>
    )
  };

  approve = (record)=>{
    Modal.confirm({
      title: '确认',
      content: <div>确认通过"{record.user_name}"的<em style={{color: 'red'}}> {record.money} </em>元充值吗?</div>,
      onOk: ()=>{
        this.props.dispatch({
          type: 'recharge/approveRecharge',
          id: record.id,
          callback: ()=>{
            message.success('操作成功,用户已充值!!')
            this.loadList();
          }
        })
      }
    });
  };

  nextPage = (pageIndex)=>{
    this.loadList({pageIndex})
  }

  render() {
    return (
      <div>
        <div style={{fontSize: 15,height: 30}}>充值记录</div>
        <Table
          rowKey={record => record.id}
          dataSource={this.state.records} columns={this.columns}
          pagination={{ pageSize: 10, total: this.state.count, onChange:this.nextPage}}
        />
      </div>
    );
  }

  formatType = (type)=>{
    let str = '';
    switch (type){
      case rechargeType.alipay: str = "支付宝"; break;
      case rechargeType.bank: str = "银行卡"; break;
      case rechargeType.wx: str = "微信"; break;
      case rechargeType.adminInput: str = "管理员手动上分"; break;
    }
    return str;
  }
}

export default connect(({recharge})=> {
  return {recharge};
})(RechargeList);
