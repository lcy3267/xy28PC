import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Row, Col} from 'antd';
import {getFrontDate} from '../../utils/formatUtil';
import {placeType, isWinning, combineRates} from '../../config';
import UserSelect from '../../components/UserSelect';

const changeType = ['投注','中奖','充值','提现','回水','充值','拒绝提现','取消下注'];


class UserIntegralChange extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      records: [],
      count: 0,
      params: {
        pageIndex: 1,
      },
    };
  }

  componentWillMount() {
    this.loadRecords();
  }

  loadRecords = ()=>{
    this.props.dispatch({
      type: 'user/integralChangeRecords',
      params: this.state.params,
      callback: ({records, count})=>{
        this.setState({records, count});
      }
    });
  }

  groupByUser = (user_id)=>{
    let params = {
      pageIndex: 1,
    }
    if(user_id != 0) params.user_id = user_id;
    this.setState({params},()=>{
      this.loadRecords();
    })
  }

  columns = [
    {title: '用户账号', dataIndex: 'account',
      render:(text, {user_id})=><a onClick={()=>{this.groupByUser(user_id)}}>{text}</a>},
    {title: '用户昵称', dataIndex: 'name'},
    {
      title: '变动积分', dataIndex: 'integral',
    },
    {title: '变动类型', dataIndex: 'type',
      render: (text)=>changeType[text-1]
    },
    {
      title: '变动时间', dataIndex: 'created_at',
      render: (text)=>getFrontDate(text, 'yyyy-MM-dd hh:mm')
    }
  ];

  nextPage = (pageIndex)=>{
    this.setState({params: {...this.state.params, pageIndex}},()=>{
      this.loadRecords({});
    });
  };

  render() {
    let {records, count} = this.state;
    return (
      <div>
        <Row type="flex" style={{fontSize: 15,height: 50}}>
          <Col><label>玩家下注记录</label></Col>
          <Col style={{marginLeft: 20}}>
            <UserSelect onSelect={(user_id)=>{this.groupByUser(+user_id)}}
            dispatch={this.props.dispatch}/>
          </Col>
        </Row>
        <Table
          rowKey={record => record.change_id}
          dataSource={records} columns={this.columns}
          pagination={{ pageSize: 10, total: count, onChange:this.nextPage}}
        />
      </div>
    );
  }
}

export default connect(({})=> {
  return {};
})(UserIntegralChange);
