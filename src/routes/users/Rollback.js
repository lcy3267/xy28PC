import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Modal, Input, message, DatePicker} from 'antd';
import {placeType, isWinning, betTypeArr} from '../../config';
import moment from 'moment';


class Rollback extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      date: moment().format('YYYY-MM-DD')
    };
  }

  componentWillMount() {
    this.loadList();
  }

  loadList = ()=>{
    this.props.dispatch({
      type: "rollback/countRollback",
      params: {
        date: this.state.date,
      },
      callback: (rs)=>{
        this.setState({users: rs.users});
      }
    });
  }

  columns = [
    {title: '账号', dataIndex: 'account',},
    {title: '昵称', dataIndex: 'name',},
    {title: '下注总额', dataIndex: 'sum_integral',},
    {title: '盈亏金额', dataIndex: 'win_integral',},
    {title: '下注次数', dataIndex: 'num',},
    {title: '组合下注积分', dataIndex: 'combine_integral',},
    {
      title: '组合占比', dataIndex: 'rate',
      render: (text, record)=>{
        let num = (record.combine_integral/record.sum_integral)*100;
        return num.toFixed(2)+'%'
      }
    },
    {title: '单点积分', dataIndex: 'point_integral',},
    {title: '初级房盈亏金额', dataIndex: 'first_num',},
    {title: '中级房盈亏金额', dataIndex: 'middle_num',},
    {title: '高级房盈亏金额', dataIndex: 'higher_num',},
    {title: '北京房下注金额', dataIndex: 'bj',},
    {title: '加拿大房下注金额', dataIndex: 'cnd',},
  ];

  onChange = (date, dateString)=>{
    this.setState({date: dateString},()=>{
      this.loadList();
    })
  }

  doRollback = ()=>{
    Modal.confirm({
      title: '提示',
      content: "是否进行回水操作",
      onOk: ()=>{
        this.props.dispatch({
          type: 'rollback/doRollback',
          params: {date: this.state.date},
          callback: (rs)=>{
            message.success('回水成功!!');
            this.loadList();
          }
        });
      }
    });
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
          <a style={{marginLeft: 20}} onClick={this.doRollback}>回水到玩家账号</a>
        </div>
        <Table
          rowKey={record => record.user_id}
          dataSource={ this.state.users } columns={this.columns}/>
      </div>
    );
  }
}

export default connect(({user})=> {
  return {user};
})(Rollback);
