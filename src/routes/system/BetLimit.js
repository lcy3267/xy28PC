import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, message, InputNumber, Button, Modal} from 'antd';

class BetLimit extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      params: {}
    };
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'system/getBetLimit',
      callback: (limit)=>{
        this.setState({params: limit});
      }
    })
  }


  onChange = (v, key)=>{
    let params = this.state.params;
    params[key] = v;
    this.setState({params});
  }

  submit = ()=>{

    Modal.confirm({
      title: '提示',
      content: '确认修改吗?',
      onOk: ()=>{
        this.props.dispatch({
          type: 'system/saveBetLimit',
          params: this.state.params,
          callback: ()=>{
            message.success('保存成功!')
          }
        })
      }
    })
  }


  render() {

    const {min_limit, sum_limit, common, combine, extreme, point} = this.state.params;

    return (
      <div>
        <div style={{fontSize: 15,height: 30}}>
          <span>下注限制 (填入0表示不限制)</span>
        </div>
        <div style={{border: '0.5px solid #D9D9D9', fontSize: 14}}>
          <div span="24" style={{padding: 20,borderBottom: '0.5px solid #D9D9D9'}}>
            <span>单注最低: </span>
            <InputNumber value={min_limit} onChange={(v)=>{this.onChange(v, 'min_limit')}}/> 起
          </div>
          <div style={{padding: 20, borderBottom: '0.5px solid #D9D9D9'}}>
            <div style={{marginBottom: 10}}>
              <span>单注封顶: </span>
            </div>
            <Row>
              <Col span="6">
                <span>大小单双: </span>
                <InputNumber value={common} onChange={(v)=>{this.onChange(v, 'common')}}/>
              </Col>
              <Col span="6">
                <span>组合: </span>
                <InputNumber value={combine} onChange={(v)=>{this.onChange(v, 'combine')}}/>
              </Col>
              <Col span="6">
                <span>极大极小: </span>
                <InputNumber value={extreme} onChange={(v)=>{this.onChange(v, 'extreme')}}/>
              </Col>
              <Col span="6">
                <span>单点: </span>
                <InputNumber value={point} onChange={(v)=>{this.onChange(v, 'point')}}/>
              </Col>
            </Row>
          </div>
          <div style={{padding: 20}}>
            <span>总注: </span>
            <InputNumber value={sum_limit} onChange={(v)=>{this.onChange(v, 'sum_limit')}}/>
          </div>

        </div>
        <div style={{marginTop: 10}}>
          <Button
            onClick={this.submit}
            type="primary" style={{padding: '6px 20px'}}>保存</Button>
        </div>
      </div>
    );
  }


}

export default connect(({})=> {
  return {};
})(BetLimit);
