import React, {Component} from 'react';
import {connect} from 'dva';
import {Table} from 'antd';
import {getFrontDate} from '../../utils/formatUtil';
import {placeType, isWinning, betTypeArr} from '../../config';

class BetRecords extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'bet/records'
    });
  }

  columns = [
    {title: '下注期数', dataIndex: 'serial_number',},
    {title: '用户', dataIndex: 'user_account',},
    {
      title: '下注类型', dataIndex: 'bottom_pour_type',
      render: (text)=>betTypeArr[text - 1]
    },
    {title: '下注金额', dataIndex: 'bottom_pour_money',},
    {
      title: '是否中奖', dataIndex: 'is_winning',
      render: (text)=> {
        if (text == isWinning.yes) return "是";
        if (text == isWinning.no) return "否";
        if (text == isWinning.await) return "未开奖";
      }
    },
    {title: '赢取积分', dataIndex: 'win_integral',},
    {title: '房间号', dataIndex: 'room_number',},
    {
      title: '玩法类型', dataIndex: 'lottery_place_type',
      render: (text)=>text == placeType.bj ? "北京" : "加拿大"
    },
    {
      title: '下注时间', dataIndex: 'created_at',
      render: (text)=>getFrontDate(text, 'yyyy-MM-dd hh:mm')
    }
  ];

  render() {
    let {bet} = this.props;
    return (
      <div>
        <div style={{fontSize: 15,height: 30}}>玩家下注记录</div>
        <Table
          rowKey={record => record.bottom_pour_id}
          dataSource={bet.records} columns={this.columns}/>
      </div>
    );
  }
}

export default connect(({bet})=> {
  return {bet};
})(BetRecords);
