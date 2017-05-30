import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Modal, Input, message, InputNumber} from 'antd';
import {getFrontDate} from '../../utils/formatUtil';
import {placeType, isWinning, betTypeArr} from '../../config';

const Search = Input.Search;

class UserList extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      pageIndex: 1,
      searchKey: '',
    };
  }

  componentWillMount() {
    this.loadList();
  }

  loadList = ()=>{
    this.props.dispatch({
      type: "user/getUsers",
      params: {
        pageIndex: this.state.pageIndex,
        searchKey: this.state.searchKey,
      }
    });
  }

  columns = [
    {
      title: '操作', dataIndex: 'operation',
      render: (text, record)=>this.getOperation(record)
    },
    {
      title: '用户状态', dataIndex: 'has_speak',
      render: (text)=>text == -1?'已禁言':'正常'
    },
    {title: '账号', dataIndex: 'account',},
    {title: '昵称', dataIndex: 'name',},
    {title: '手机号', dataIndex: 'mobile',},
    {title: '当前积分', dataIndex: 'integral',},
    {title: '下注次数', dataIndex: 'bottom_pour_money',},
    {title: '备注', dataIndex: 'remark',},
    {title: '注册时间', dataIndex: 'created_at', render: (text)=>getFrontDate(text,'yyyy-MM-dd hh:ss')},
  ];

  getOperation = (record)=>{
    const {has_speak} = record;
    return (
      <span>
        <a style={{marginRight: 10}} onClick={()=>{this.recharge(record)}}>上分</a>
        <a onClick={()=>{this.updateUserSpeak(record)}}>{has_speak == 1?'禁言':'取消禁言'}</a>
      </span>
    )
  }

  updateUserSpeak = (record)=>{
    const {has_speak, name, user_id} = record;
    let str = has_speak == 1?`确认禁言"${name}"吗`:`确认取消玩家"${name}"的禁言吗?`;
    Modal.confirm({
      title: '确认',
      content: <div>{str}</div>,
      onOk: ()=>{
        this.props.dispatch({
          type: 'user/updateUserSpeak',
          params: {
            user_id,
            has_speak: -has_speak,
          },
          callback: ()=>{
            message.success('操作!!');
            this.loadList();
          }
        })
      }
    })
  }

  recharge = (record)=>{
    Modal.confirm({
      title: '充值',
      content: <div>
        <label>充值积分: </label>
        <InputNumber
          style={{width: 150}}
          placeholder="" onChange={(e)=>{this.setState({integral: +e})}}/>
      </div>,
      onOk: ()=>{
        Modal.confirm({
          title: '提示',
          content: <div>确认给"{record.name}"充值
            <em style={{color: 'red'}}>{this.state.integral}</em>分吗?</div>,
          onOk: ()=>{
            this.props.dispatch({
              type: 'recharge/rechargeIntegral',
              params: {
                user_id: record.user_id,
                integral: this.state.integral
              },
              successCallback: ()=>{
                message.success('充值成功!!');
                this.loadList();
              }
            });
          }
        })

      }
    })
  }

  onSearch = (searchKey)=>{
    this.setState({searchKey},()=>{
      this.loadList();
    })
  }

  render() {

    let { user: { list } } = this.props;

    return (
      <div>
        <div style={{fontSize: 15,height: 30,marginBottom: 10}}>
          <span>玩家列表</span>
          <Search onSearch={this.onSearch} placeholder="输入账号进行搜索"
            type="search" style={{width: 200, marginLeft: 50}}/>
        </div>
        <Table
          rowKey={record => record.user_id}
          dataSource={ list } columns={this.columns}/>
      </div>
    );
  }
}

export default connect(({user})=> {
  return {user};
})(UserList);
