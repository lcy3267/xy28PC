import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Modal, message} from 'antd';
import RuleRatesSelect from '../../components/RuleRatesSelect';
import SpecialGameRuleSelect from '../../components/SpecialGameRuleSelect';

class Rooms extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      rooms: []
    };
  }

  componentWillMount() {
    this.loadRooms();
  }

  loadRooms = ()=>{
    this.props.dispatch({
      type: 'system/rooms',
      callback: (rooms)=>{
        this.setState({rooms})
      }
    });
  }

  columns = [
    {
      title: '操作', dataIndex: 'id',
      render: (text, record)=>this.getOperation(record)
    },
    {
      title: '是否禁言', dataIndex: 'is_speak',
      render: (text)=>text == 1?'未禁言':'已禁言'
    },
    {
      title: '房间状态', dataIndex: 'status',
      render: (text)=>text == 1?'正常':'已关闭'
    },
    {
      title: '房间类型', dataIndex: 'room_type',
      render: (text)=>this.getRoomType(text)
    },
    {
      title: '房间等级', dataIndex: 'level',
      render: (text)=>this.getRoomLevel(text)
    },
    {
      title: '大小单双赔率', dataIndex: 'rule_combine_id',
      render: (text, record)=><RuleRatesSelect paly_type={1} rule_id={text} updateRules={(v)=>{this.updateRoomGameRule(v, record, 1)}}/>
    },
    {
      title: '单点赔率', dataIndex: 'rule_single_id',
      render: (text, record)=><RuleRatesSelect paly_type={2} rule_id={text} updateRules={(v)=>{this.updateRoomGameRule(v, record, 2)}}/>
    },
    {
      title: '大小单双13/14赔率', dataIndex: 'special_game_rule_id',
      render: (text, record)=><SpecialGameRuleSelect rule_type={1} rule_id={text} updateRules={(v)=>{this.updateRoomGameRule(v, record, 3)}}/>
    },
    {
      title: '组合13/14赔率', dataIndex: 'combine_special_rule_id',
      render: (text, record)=><SpecialGameRuleSelect rule_type={2} rule_id={text} updateRules={(v)=>{this.updateRoomGameRule(v, record, 4)}}/>
    },
  ];

  updateRoomGameRule = (v, record, type)=>{
    this.props.dispatch({
      type: 'lottery/updateRoomGameRule',
      params: {
        roomId: record.id,
        ruleId: v,
        playType: type,
      },
      callback: ()=>{
        message.success('修改赔率规则成功!!!', 4);
      }
    })
  }

  updateRollbackRules = (v, record)=>{
    this.props.dispatch({
      type: 'system/updateRollbackRules',
      params: {
        roomId: record.id,
        rollbackTypeId: v,
      },
      callback: ()=>{
        message.success('修改回水规则成功!!!', 4);
      }
    })
  }

  getOperation = (record)=>{
    return ([
      <a key="1" onClick={()=>{this.updateRoomSpeak(record)}}>{record.is_speak == 1?'禁言':'取消禁言'}</a>,
      <a key="2"
         onClick={()=>{this.updateRoomStatus(record)}}
         style={{marginLeft: 15}}>{record.status == 1?'关闭房间':'打开房间'}</a>,
    ])
  }

  updateRoomStatus = (record)=>{
    const {status, room_type, level, id} = record;
    const str = status == 1 ? '关闭': '打开';
    Modal.confirm({
      title: '确认',
      content: <div>确认{str}"{this.getRoomType(room_type)}{this.getRoomLevel(level)}"吗?</div>,
      onOk: ()=>{
        this.props.dispatch({
          type: 'system/updateRoomStatus',
          params: {
            roomId: id,
            status: -status,
          },
          callback: ()=>{
            this.loadRooms();
            message.success(str+'成功!!');
          }
        })
      }
    })
  }

  updateRoomSpeak = (record)=>{
    const {is_speak, room_type, level, id} = record;
    const str = is_speak == 1 ? '禁言': '取消禁言';
    Modal.confirm({
      title: '确认',
      content: <div>确认{str}"{this.getRoomType(room_type)}{this.getRoomLevel(level)}"吗?</div>,
      onOk: ()=>{
        this.props.dispatch({
          type: 'system/updateRoomSpeak',
          params: {
            roomId: id,
            is_speak: -is_speak,
          },
          callback: ()=>{
            this.loadRooms();
            message.success(str+'成功!!');
          }
        })
      }
    })
  }


  render() {
    return (
      <div>
        <div style={{fontSize: 15,height: 30}}>
          <span>房间列表</span>
        </div>
        <Table
          rowKey={record => record.id}
          dataSource={ this.state.rooms } columns={this.columns}/>
      </div>
    );
  }

  getRoomLevel(text){
    if(text == 1) return '初级房';
    if(text == 2) return '中级房';
    if(text == 3) return '高级房';
  }

  getRoomType(text){
    return text == 1?'北京':'加拿大';
  }
}

export default connect(({})=> {
  return {};
})(Rooms);
