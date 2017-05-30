import React, {Component} from 'react';
import {connect} from 'dva';
import {Input, Button, message, Modal} from 'antd';
import {placeType, isWinning, combineRates} from '../../config';
import { routerRedux } from 'dva/router';

class AddMassage extends Component {
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
  }

  doAdd = ()=>{
    const {title, content} = this.state;

    Modal.confirm({
      title: '提示',
      content: <div>是否发送系统消息</div>,
      onOk: ()=>{
        this.props.dispatch({
          type: 'message/addMessage',
          params: {
            title,
            content
          },
          callback: (rs)=>{
            message.success('消息发送成功!');
            this.props.dispatch(routerRedux.push('/systemList'));
          }
        });
      }
    });
  }

  render() {
    return (
      <div style={{fontSize: 14}}>
        <div style={{fontSize: 15,height: 30}}>发送系统通知</div>
        <div style={{height: 50}}>
          <label style={{fontSize: 14, marginRight: 10}}>标题:</label>
          <Input
            onChange={(e)=>{this.setState({title: e.target.value})}}
            style={{width: 300, padding: '2px 4px'}}/>
        </div>
        <div>
          <Input
            onChange={(v)=>{this.setState({content: v.target.value})}}
            type="textarea" rows={6} style={{width: 600, fontSize: 14}}/>
        </div>
        <div style={{width: 600, textAlign: 'right', marginTop: 10}}>
          <Button
            onClick={this.doAdd}
            type="primary" style={{padding: '6px 20px'}}>发送</Button>
        </div>
      </div>
    );
  }
}

export default connect(({})=> {
  return {};
})(AddMassage);
