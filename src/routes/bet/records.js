import React, {Component} from 'react';
import {connect} from 'dva';
import {Table} from 'antd';
import {getFrontDate} from '../../utils/formatUtil';
import {placeType, isWinning, combineRates} from '../../config';

class BetRecords extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      records: [],
      count: 0
    };
  }

  componentWillMount() {
    this.loadRecords();
  }

  loadRecords = (params = {pageIndex: 1})=>{
    this.props.dispatch({
      type: 'bet/records',
      params,
      callback: (rs)=>{
        this.setState({count: rs.count});
      }
    });
  }

  columns = [
    {title: '下注期数', dataIndex: 'serial_number',},
    {title: '用户', dataIndex: 'user_account',},
    {
      title: '下注类型', dataIndex: 'bottom_pour_type',
      render: (text, record)=>combineRates[text]?combineRates[text]:record.bottom_pour_number
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
    {
      title: '房间等级', dataIndex: 'room_level',
      render: (text)=>text == 1?'初级房':text == 2?'中级房':text == 3?'高级房':''
    },
    {
      title: '玩法类型', dataIndex: 'lottery_place_type',
      render: (text)=>text == placeType.bj ? "北京" : "加拿大"
    },
    {
      title: '下注时间', dataIndex: 'created_at',
      render: (text)=>getFrontDate(text, 'yyyy-MM-dd hh:mm')
    }
  ];

  nextPage = (pageIndex)=>{
    this.loadRecords({pageIndex});
  };

  render() {
    let {bet} = this.props;
    return (
      <div>
        <div style={{fontSize: 15,height: 30}}>玩家下注记录</div>
        <Table
          rowKey={record => record.bottom_pour_id}
          dataSource={bet.records} columns={this.columns}
          pagination={{ pageSize: 10, total: this.state.count, onChange:this.nextPage}}
        />
      </div>
    );
  }
}

export default connect(({bet})=> {
  return {bet};
})(BetRecords);
